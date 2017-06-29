import P from 'bluebird'
import { action, computed, observable } from 'mobx'

window.AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

const minVolume = 0.001
const fadeLength = 4

const tracks = [
  'https://s3-us-west-2.amazonaws.com/subghost-loops/01.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/02.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/03.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/04.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/05.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/06.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/07.ogg',
  'https://s3-us-west-2.amazonaws.com/subghost-loops/08.ogg',
]

export class AudioStore {
  static mobxLoggerConfig = {
    enabled: false
  }

  audioLoaded = false
  buffers = []
  loaded = []

  isFading = false
  isAudioPlaying = false

  @observable loopPosition
  @computed get activeIndex() {
    return this.activeSource.index
  }

  incomingSource = undefined
  activeSource = null

  constructor() {
    this.loadAudio()
    window.audioStore = this
  }

  loadTrack = (trackUrl, index) => {
    return fetch(trackUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer, audioBuffer => {
        this.buffers[index] = audioBuffer
        this.loaded[index] = true

        // autoplay loaded enqueued track
        if (index === this.enqueuedTrackIndex) {
          this.enqueuedTrackIndex = null
          this.firstPlay(index)
        }
      }))
  }

  loadAudio = () => {
    P.map(tracks, this.loadTrack, {
      concurrency: 1,
    }).then(() => {
      this.audioLoaded = true
    })
  }

  firstPlay = (trackIndex) => {
    this.fadeIn(trackIndex)

    setInterval(() => {
      const activeSource = this.activeSource
      const loopDuration = activeSource.buffer.duration
      const pos = ((context.currentTime - activeSource._startTime) % loopDuration) / loopDuration
      this.setLoopPosition(pos)
    }, 100)
  }

  @action setLoopPosition = (pos) => {
    this.loopPosition = pos
  }

  fadeIn = (trackIndex = 0, offset = 0) => {
    const source = context.createBufferSource()
    const gainNode = context.createGain()
    source.gainNode = gainNode

    gainNode.gain.setValueAtTime(minVolume, context.currentTime)

    const buffer = this.buffers[trackIndex]

    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(context.destination)

    source._startTime = context.currentTime - offset
    source.loop = true
    source.index = trackIndex

    source.start(0, offset)

    this.isAudioPlaying = true

    const fadeTime = context.currentTime + fadeLength
    gainNode.gain.linearRampToValueAtTime(1.0, fadeTime)

    if (!this.activeSource) {
      this.activeSource = source
    } else {
      this.incomingSource = source
    }

    return source
  }

  getOffset = () => {
    let offset
    const activeStartTime = this.activeSource._startTime
    if (context.currentTime > activeStartTime) {
      offset = (context.currentTime - activeStartTime) % this.activeSource.buffer.duration
    }

    return offset
  }

  crossFade = (nextTrackIndex) => {
    if (this.isFading) {
      return
    }

    this.isFading = true

    this.fadeOut()

    const incoming = this.fadeIn(nextTrackIndex, this.getOffset())

    setTimeout(() => {
      this.isFading = false
      this.incomingSource = null
      this.activeSource = incoming

      if (this.enqueuedTrackIndex !== null) {
        this.crossFade(this.enqueuedTrackIndex, this.getOffset())
        this.enqueuedTrackIndex = null
      }
    }, fadeLength * 1000)
  }

  fadeOut = () => {
    const source = this.activeSource

    const fadeTime = context.currentTime + fadeLength
    source.gainNode.gain.linearRampToValueAtTime(minVolume, fadeTime)

    setTimeout(() => {
      source.stop()
    }, fadeTime * 1000)
  }

  playIndex = (trackIndex) => {
    if (this.isFading || !this.loaded[trackIndex]) {
      this.enqueuedTrackIndex = trackIndex
    } else {
      this.crossFade(trackIndex)
    }
  }
}
