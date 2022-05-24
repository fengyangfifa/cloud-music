// 解析 [00:01.997] 这一类时间戳的正则表达式
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

export enum State {
  PAUSE = 0,
  PLAYING = 1
}

interface HandlerType {
  ({ txt, lineNum }: { txt: string; lineNum: number }): void;
}

class Lyric {
  lrc: string;
  lines: Array<{ time: number; txt: string }>;
  handler: HandlerType;
  state: State;
  curLineIndex: number;
  startStamp: number;
  timer: number = 0;

  constructor(lrc: string, handler: HandlerType) {
    this.lrc = lrc;
    this.lines = []; // 这是解析后的数组，每一项包含对应的歌词和时间
    this.handler = handler; // 回调函数
    this.state = State.PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前播放歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳

    this._initLines();
  }

  _initLines() {
    const lines = this.lrc.split("\n");

    lines.forEach((line) => {
      const result = timeExp.exec(line);
      if (!result) {
        return;
      }

      const txt = line.replace(timeExp, "").trim(); // 现在把时间戳去掉，只剩下歌词文本
      if (txt) {
        this.lines.push({
          // 转化具体到毫秒的时间
          time:
            Number(result[1]) * 60 * 1000 +
            Number(result[2]) * 1000 +
            parseInt(String(Number(result[3]) / 10), 10) * 10,
          txt
        });
      }
    });

    this.lines.sort((a, b) => a.time - b.time);
  }

  // offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }

    this.state = State.PLAYING;

    // 找到当前所在的行
    this.curLineIndex = this._findCurLineIndex(offset);

    // 现在正处于第 this.curLineIndex-1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this._callHandler(this.curLineIndex - 1);

    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = +new Date() - offset;

    if (this.curLineIndex < this.lines.length) {
      window.clearTimeout(this.timer);

      // 继续播放
      this._playRest(isSeek);
    }
  }

  _findCurLineIndex(time: number) {
    let index = this.lines.findIndex((item) => time <= item.time);
    if (index === -1) {
      index = this.lines.length - 1;
    }

    return index;
  }

  _callHandler(index: number) {
    if (index < 0) {
      return;
    }

    this.handler({
      txt: this.lines[index].txt,
      lineNum: index
    });
  }

  // isSeek 标志位表示用户是否手动调整进度
  _playRest(isSeek = false) {
    const line = this.lines[this.curLineIndex];
    let delay: number;

    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      const preLine = this.lines[this.curLineIndex - 1];
      const preTime = preLine ? preLine.time : 0;
      delay = line.time - preTime;
    }

    this.timer = window.setTimeout(() => {
      this._callHandler(this.curLineIndex++);

      if (
        this.curLineIndex < this.lines.length &&
        this.state === State.PLAYING
      ) {
        this._playRest();
      }
    }, delay);
  }

  stop() {
    this.state = State.PAUSE;
    window.clearTimeout(this.timer);
  }

  seek(offset: number) {
    this.play(offset, true);
  }
}

export default Lyric;
