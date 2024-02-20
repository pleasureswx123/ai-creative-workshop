import {mapState, mapActions, mapMutations} from 'vuex';
import VideoItem from '../components/VideoItem.vue';
import ImgItem from '../components/ImgItem.vue';

export default {
  provide() {
    return {
      previewVideo: this.previewVideo
    }
  },
  components: {
    VideoItem, ImgItem,
  },
  computed: {
    ...mapState('HomeInfo', ['stayTunedInfo']),
  },
  data() {
    return {
      showPreviewVideo: false,
      previewVideoInfo: null,
    }
  },
  onShow() {
    this.getStayTuned({task_type: this.taskType})
  },
  beforeDestroy() {
    this.setStayTunedInfo();
  },
  methods: {
    ...mapActions('HomeInfo', ['getStayTuned']),
    ...mapMutations('HomeInfo', ['setStayTunedInfo']),
    previewVideo(videoInfo) {
      this.previewVideoInfo = videoInfo;
      this.showPreviewVideo = true;
    },
  }
}