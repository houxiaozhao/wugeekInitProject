<template>
  <d2-container class="page">
    <dash-borad></dash-borad>
    <el-row :gutter="20">
      <el-col :md="10" :sm="24" :xs="24">
        <el-card style="margin-top:16px">
          <div slot="header" class="clearfix">
            <span>监测点</span>
          </div>

        </el-card>
      </el-col>
      <el-col :md="14" :sm="24" :xs="24">
        <el-col :span="24">
          <el-card style="margin-top:16px;" ref='mapCard'>
            <div slot="header" class="clearfix">
              厂区图
              <el-tooltip effect="dark" content="全屏" placement="top">
                <el-button type="text" style="float:right" size="mini" @click="screenfull()">
                  <d2-icon name="arrows-alt" />
                </el-button>
              </el-tooltip>
            </div>
            <l-map ref="map" :style="{height:mapHeight,width:'100%'}" :maxZoom="3" :minZoom="0" :crs="crs">
              <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
              <l-marker :lat-lng="[200,200]" :icon="okicon" @click="openDialog()">
                <l-tooltip :options="{direction:'top',offset:[0,-30]}" :content="'hhhh'" />
              </l-marker>
            </l-map>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialog" width="30%">
      <span>这是一段信息</span>
      <span slot="footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import dashBorad from './components/dashBorad';
import { LMap, LImageOverlay, LMarker, LPolyline, LTooltip } from 'vue2-leaflet';
import screenfull from 'screenfull';
export default {
  name: 'index',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPolyline,
    LTooltip,
    dashBorad
  },
  data() {
    return {
      url: '',
      bounds: [],
      crs: L.CRS.Simple,
      yx: L.latLng,
      okicon: okIcon,
      isthisPage: false,
      mapHeight: '600px',
      mapW: 610,
      mapH: 706,
      dialog: false
    };
  },
  computed: {},
  mounted() {
    this.url = `${this.$baseUrl}image/map.jpg`;
    this.bounds = [this.xy(0, 0), this.xy(mapW, mapH)];
    this.$nextTick().then(() => {
      this.$refs.map.mapObject.setView(this.xy(mapW / 2, mapH / 2), 0);
    });
    if (screenfull.enabled) {
      screenfull.on('change', () => {
        if (this.isthisPage) {
          setTimeout(() => {
            this.mapHeight = this.$refs.mapCard.$el.clientHeight - 96 + 'px';
            if (screenfull.isFullscreen) {
              this.$refs.map.mapObject.setView(this.xy(mapW / 2, mapH / 2), 1);
            } else {
              this.mapHeight = '600px';
              this.$refs.map.mapObject.setView(this.xy(mapW / 2, mapH / 2), 0);
            }
          }, 100);
        }
      });
    }
  },
  methods: {
    xy(x, y) {
      return this.yx(y, x); // When doing xy(x, y);
    },
    openDialog() {
      this.dialog = true;
    },
    screenfull() {
      if (screenfull.enabled) {
        if (screenfull.isFullscreen) {
          screenfull.exit();
        } else {
          this.isthisPage = true;
          screenfull.request(this.$refs.mapCard.$el);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
</style>
