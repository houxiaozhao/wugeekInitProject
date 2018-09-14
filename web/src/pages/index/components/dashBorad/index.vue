<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <el-col :span="8" style="height:100px;background-color: #667aa6;color:#fff;align-items: center;justify-content: center;display: flex;">
                    <i class="el-icon-view" style="font-size: 40px;"></i>
                </el-col>
                <el-col :span="16" style="height:100px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                    <div style="color: #667aa6;font-size: 30px;font-weight: 700;">13</div>
                    <div style="font-size: 12px;font-weight: 500;color: #C8C8C8;">检测设备</div>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <el-col :span="8" style="height:100px;background-color: #64d572;color:#fff;align-items: center;justify-content: center;display: flex;">
                    <i class="el-icon-upload" style="font-size: 40px;"></i>
                </el-col>
                <el-col :span="16" style="height:100px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                    <div style="color: #64d572;font-size: 30px;font-weight: 700;">8654</div>
                    <div style="font-size: 12px;font-weight: 500;color: #C8C8C8;">今日数据采集量</div>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <el-col :span="8" style="height:100px;background-color: #ed3f14;color:#fff;align-items: center;justify-content: center;display: flex;">
                    <i class="el-icon-warning" style="font-size: 40px;"></i>
                </el-col>
                <el-col :span="16" style="height:100px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                    <div style="color: #ed3f14;font-size: 30px;font-weight: 700;">3</div>
                    <div style="font-size: 12px;font-weight: 500;color: #C8C8C8;">离线设备</div>
                </el-col>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <el-col :span="8" style="height:100px;background-color: #ffd572;color:#fff;align-items: center;justify-content: center;display: flex;">
                    <i class="el-icon-bell" style="font-size: 40px;"></i>
                </el-col>
                <el-col :span="16" style="height:100px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                    <div style="color: #ffd572;font-size: 30px;font-weight: 700;">10</div>
                    <div style="font-size: 12px;font-weight: 500;color: #C8C8C8;">数据异常设备</div>
                </el-col>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'dashBorad',
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
