import {pictureApi} from "@/api";
import {mapState, mapActions} from 'vuex';

export default {
  data() {
    return {
      generating: false,
    }
  },
  computed: {
    ...mapState('PictureInfo', ['taskDetail']),
  },
  onHide() {
    this.clearTimer();
  },
  onLoad({type}) {
    debugger
    this.getMaterial({task_type: type})
  },
  methods: {
    ...mapActions('PictureInfo', ['createTask', 'getMaterial']),
    clearTimer() {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleGenerate(cb) {
      this.createTask(this.params).then(({task_id}) => {
        this.generating = true;
        const func = () => {
          pictureApi.getTaskstate({task_id}).then(({state}) => {
            if(state === 2) { // 生成失败
              this.generating = true;
              cb && cb();
              this.clearTimer();
              uni.$u.toast('生成任务失败');
              return
            }
            if(state === 1) { // 生成成功
              this.generating = true;
              cb && cb();
              this.clearTimer();
              uni.$u.route({
                url: `pages/picture/index`
              });
              return;
            }
          })
        }
        this.timer = setInterval(() => {
          func();
        }, 5000);
      }).catch(err => {
        cb && cb();
      });
    }
  }
}