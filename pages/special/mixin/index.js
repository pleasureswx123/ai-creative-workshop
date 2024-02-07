import {mapState, mapActions, mapMutations} from 'vuex';
import VideoItem from '../components/VideoItem.vue';
import ImgItem from '../components/ImgItem.vue';

export default {
  components: {
    VideoItem, ImgItem,
  },
  computed: {
    ...mapState('HomeInfo', ['stayTunedInfo']),
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
  }
}