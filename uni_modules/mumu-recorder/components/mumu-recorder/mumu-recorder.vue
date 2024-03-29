<template>
	<view class="recorder">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isUserMedia: false,
				stream: null,
				audio: null,
				recorder: null,
				chunks: [],
				startTime: 0
			}
		},
		mounted() {
			/**
			 * 	error 事件的返回状态
			 * 	100: 请在HTTPS环境中使用
			 * 	101: 浏览器不支持
			 *  201: 用户拒绝授权
			 *  500: 未知错误
			 * */
			if (origin.indexOf('https') === -1) {
				this.$emit('error', '100')
				throw '请在 https 环境中使用本插件。'
			}
			if (!navigator.mediaDevices || !window.MediaRecorder) {
				this.$emit('error', '101')
				throw '当前浏览器不支持'
			}

			this.getRecorderManager()
		},
		methods: {
			getRecorderManager() {
				this.audio = document.createElement('audio')
				navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
					this.isUserMedia = true
					stream.getTracks().forEach((track) => {
						track.stop()
					})
				}).catch(err => {
					this.onErrorHandler(err)
				})
			},
			start() {
				if (!this.isUserMedia) return console.log('设备不支持')

				navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
					this.startTime = new Date().getTime()
					this.stream = stream
					this.recorder = new MediaRecorder(stream)
					this.recorder.ondataavailable = this.getRecordingData
					this.recorder.onstop = this.saveRecordingData
					this.recorder.start()
				}).catch(err => {
					this.onErrorHandler(err)
				})
			},
			stop() {
				this.recorder&&this.recorder.stop()
				this.stream&&this.stream.getTracks().forEach((track) => {
					track.stop()
				})
			},
			getRecordingData(e) {
				console.log(e,'eeee')
				this.getMp3Data()
				this.chunks = [e.data]
			},
			saveRecordingData() {
				const blob = new Blob(this.chunks, { 'type': 'audio/mpeg' }),
					localUrl = URL.createObjectURL(blob)

				const endTime = new Date().getTime()
				let duration = (endTime - this.startTime).toString().split('')
				duration.splice(duration.length - 2)
				duration.splice(duration.length - 1, 0, '.')
				duration = parseFloat(duration.join(''))

				const recorder = {
					data: blob,
					duration: duration,
					localUrl: localUrl
				}
				this.$emit('success', recorder)
			},
			getMp3Data() {
				console.log(this.recorder,'this.recorder')
				const mp3Blob = this.convertToMp3(this.recorder.getWAV());
				recorder.download(mp3Blob, "recorder", "mp3");
			},
			convertToMp3(wavDataView) {
				// 获取wav头信息
				const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
				const {
					channels,
					sampleRate
				} = wav;
				const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
				// 获取左右通道数据
				const result = recorder.getChannelData();
				const buffer = [];
				const leftData =
					result.left &&
					new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
				const rightData =
					result.right &&
					new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
				const remaining = leftData.length + (rightData ? rightData.length : 0);
				const maxSamples = 1152;
				for (let i = 0; i < remaining; i += maxSamples) {
					const left = leftData.subarray(i, i + maxSamples);
					let right = null;
					let mp3buf = null;
					if (channels === 2) {
						right = rightData.subarray(i, i + maxSamples);
						mp3buf = mp3enc.encodeBuffer(left, right);
					} else {
						mp3buf = mp3enc.encodeBuffer(left);
					}
					if (mp3buf.length > 0) {
						buffer.push(mp3buf);
					}
				}
				const enc = mp3enc.flush();
				if (enc.length > 0) {
					buffer.push(enc);
				}
				return new Blob(buffer, {
					type: "audio/mp3"
				});
			},
			onErrorHandler(err) {
				console.log(err)
				if (err.name === 'NotAllowedError') {
					this.$emit('error', '201')
					throw '用户拒绝了当前的浏览器实例的访问请求'
				}

				if (err.name === 'NotReadableError') {
					this.$emit('error', '101')
					throw '当前浏览器不支持'
				}

				this.$emit('error', '500')
				throw '调用失败，原因不详'

			}
		},
		destroyed() {
			this.stop()
		}
	}
</script>
<style>
</style>
