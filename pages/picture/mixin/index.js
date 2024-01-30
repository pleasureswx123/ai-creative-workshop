import {pictureApi} from "@/api";
import {mapState, mapActions} from 'vuex';
import PicHeader from '../components/PicHeader.vue';
import TitleCell from '../components/TitleCell.vue';
import UploadImg from '../components/UploadImg.vue';
import QmRadio from '../components/QmRadio.vue';
import QmCheckbox from '../components/QmCheckbox.vue';
import TipsHelp from '../components/TipsHelp.vue';
import QmInput from '../components/QmInput.vue';
import QmTextarea from '../components/QmTextarea.vue';
import ImgInfo from '../components/ImgInfo.vue';

export default {
  provide() {
    return {
      setSourceImg: this.setSourceImg
    }
  },
  components: { PicHeader, TitleCell, UploadImg, QmRadio, QmInput, QmTextarea, TipsHelp, ImgInfo, QmCheckbox },
  data() {
    return {
      generateState: 1,  // 1:初始化状态 2:开始生成状态 3:生成成功状态
      finalUrl: '',
    }
  },
  computed: {
    ...mapState('PictureInfo', ['taskDetail']),
    generating() {
      return this.generateState === 2
    },
    btnInfo() {
      const temp = {btnTxt: '开始生成', loadingBtnTxt: '正在生成...', tipTxt: '消耗10'};
      return this.generateState === 3 ? {btnTxt: '重新生成'} : temp;
    },
  },
  onHide() {
    this.clearTimer();
  },
  onLoad({type}) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptData', ({data}) => {
      const { currentImg } = data || {};
      this.sourceImg = currentImg;
    })
    type && this.getMaterial({task_type: type});
  },
  methods: {
    ...mapActions('PictureInfo', ['createTask', 'getMaterial']),
    setSourceImg(url) {
      this.sourceImg = url;
    },
    clearTimer() {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleGenerate() {
      if(this.generateState === 3) {
        this.generateState = 1;
        return;
      }
      this.generateState = 2;
      this.createTask(this.params).then(({task_id}) => {
        const func = () => {
          pictureApi.getTaskstate({task_id}).then((res) => {
            const {state, url} = res || {};
            if(state === 2) { // 生成失败
              this.generateState = 1;
              this.clearTimer();
              uni.$u.toast('生成任务失败');
              return
            }
            if(state === 1) { // 生成成功
              this.generateState = 3;
              this.clearTimer();
              this.finalUrl = url;
              return;
            }
          }).catch(() => {
            this.generateState = 1;
            this.clearTimer();
          })
        }
        this.timer = setInterval(() => {
          func();
        }, 3000);
      }).catch(() => {
        this.generateState = 1;
      })
    }
  }
}