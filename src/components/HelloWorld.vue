<template>
  <div class="hello">
    <div class="header">
      <div class="logo">
        <van-image :src="require('@/assets/img/banner@2x.png')" fit="cover" class="img"></van-image>
      </div>
    </div>
    <div class="form">
      <div class="form-title">个人信息</div>
      <div class="form-box">
        <div class="form-list">
          <van-field v-model="form.unitName" class="input-box" placeholder="请输入单位名称" />
        </div>
        <div class="form-list">
          <van-field v-model="form.name" class="input-box" placeholder="请输入姓名" />
        </div>
        <div class="form-list">
          <van-field v-model="form.position" class="input-box" placeholder="请输入职务" />
        </div>
        <div class="form-list">
          <van-field v-model="form.mobile" class="input-box" placeholder="请输入联系方式" />
        </div>
      </div>
      <div class="form-title">陪同人员信息</div>
      <div class="form-box form-box-relative">
        <template v-for="(item, index) in form.detailDtoList">
          <div class="form-box-box flex" :key="index">
            <div class="form-input-box">
              <div class="form-list">
                <van-field v-model="item.name" class="input-box" placeholder="请输入陪同人员姓名" />
              </div>
              <div class="form-list">
                <van-field v-model="item.position" class="input-box" placeholder="请输入陪同人员职务" />
              </div>
              <div class="form-list">
                <van-field v-model="item.mobile" class="input-box" placeholder="请输入陪同人员联系方式" />
              </div>
            </div>
            <div class="btn-box">
              <div class="btn-del" @click="del(index)" v-if="index >= 1"></div>
            </div>
          </div>
        </template>
        <div class="btn-add" @click="add()"></div>
      </div>
      <div class="form-title">交通方式</div>
      <div class="form-box">
        <div class="form-subtitle">来程交通方式</div>
        <div class="come-hint">目的地为海宁校区（浙江海宁市长安镇青年路999号）</div>
        <van-radio-group v-model="form.comeTypeChecked" direction="horizontal">
          <van-radio name="1">自驾</van-radio>
          <van-radio name="2">高铁</van-radio>
          <van-radio name="3">飞机</van-radio>
        </van-radio-group>
        <div class="form-list">
          <van-field v-model="form.comeText" class="input-box" :placeholder="!form.comeTypeChecked ? '请选择交通方式' : form.comeTypeChecked === '1' ? '请输入车牌号' : form.comeTypeChecked === '2' ? '请输入高铁车次' : '请输入航班'" />
        </div>
        <div class="form-subtitle">回程交通方式</div>
        <van-radio-group v-model="form.goTypeChecked" direction="horizontal">
          <van-radio name="1">自驾</van-radio>
          <van-radio name="2">高铁</van-radio>
          <van-radio name="3">飞机</van-radio>
        </van-radio-group>
      </div>
      <div class="form-title">用餐信息</div>
      <div class="form-box">
        <div class="form-subtitle">是否用餐</div>
        <van-radio-group v-model="form.isEat" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </div>
      <div class="form-title">住宿信息</div>
      <div class="form-box">
        <div class="form-subtitle">是否住宿</div>
        <van-radio-group v-model="form.isStay" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </div>
      <div class="form-title">参加活动</div>
      <div class="form-box">
        <van-checkbox-group v-model="form.joinActivityChecked">
          <van-checkbox name="1" shape="square">10:00-11:00 建校70周年庆典大会</van-checkbox>
          <van-checkbox name="2" shape="square">11:15-11:45 浙江机械工业博物馆、校史馆开馆仪式、巡馆仪式</van-checkbox>
          <van-checkbox name="3" shape="square">14:00-16:30 学校发展战略咨询会议</van-checkbox>
          <van-checkbox name="4" shape="square">14:00-16:00 校友企业家联谊会会议</van-checkbox>
          <van-checkbox name="5" shape="square">18:30-20:30 学生素.质教育成果汇报演出</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="contract">
        <div class="contract-tel"><span class="contract-tel-label">联系人：</span>石老师18668179772</div>
        <div class="contract-tel contract-tel1">姜老师17826829772</div>
        <div class="contract-tel contract-tel1">张老师18657126877</div>
        <div class="contract-tel"><span class="contract-tel-label">联系方式：</span>0571-87773009； 0571-87773000</div>
        <div class="contract-tel"><span class="contract-tel-label">传真：</span>0571-87773001</div>
      </div>
      <div class="submit-btn" @click="onSubmit">提交</div>
    </div>
    <div class="hint">温馨提示：
      根据疫情防控要求，进校需持有杭州或嘉兴健康码绿码，48小时内核酸检测阴性报告，7天内无风险区旅居史。如7天内有省外旅居史，请在入校前完成“三天三检”，感谢您的理解与支持。</div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {
      loading: false,
      form: {
        unitName: '',
        name: '',
        position: '',
        mobile: '',
        detailDtoList: [
          {name: '', position: '', mobile: ''}
        ],
        comeTypeChecked: '',
        goTypeChecked: '',
        comeText: '',
        isEat: '',
        isStay: '',
        joinActivityChecked: []
      }
    }
  },
  methods: {
    onSubmit() {
      if(this.loading) {
        return
      }
      this.loading = true
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if(!this.form.unitName) {
        this.$toast.fail('请输入单位名称')
        this.loading = false
        return
      }
      if(!this.form.name) {
        this.$toast.fail('请输入姓名')
        this.loading = false
        return
      }
      if(!this.form.position) {
        this.$toast.fail('请输入职务')
        this.loading = false
        return
      }
      if(!this.form.mobile) {
        this.$toast.fail('请输入联系方式')
        this.loading = false
        return
      }
      if(!phoneReg.test(this.form.mobile)){
        this.$toast.fail('请输入正确的联系方式')
        this.loading = false
        return
      }
      if(!this.form.comeTypeChecked) {
        this.$toast.fail('请选择来程交通方式')
        this.loading = false
        return
      }
      if(!this.form.comeText) {
        if(this.form.comeTypeChecked === '1') {
          this.$toast.fail('请输入车辆车牌')
        } else if(this.form.comeTypeChecked === '2') {
          this.$toast.fail('请输入高铁车次')
        } else if(this.form.comeTypeChecked === '3') {
          this.$toast.fail('请输入航班')
        }
        this.loading = false
        return
      }
      if(!this.form.goTypeChecked) {
        this.$toast.fail('请选择回程交通方式')
        this.loading = false
        return
      }
      if(!this.form.isEat) {
        this.$toast.fail('请选择是否用餐')
        this.loading = false
        return
      }
      if(!this.form.isStay) {
        this.$toast.fail('请选择是否住宿')
        this.loading = false
        return
      }
      if(!this.form.joinActivityChecked.length) {
        this.$toast.fail('请选择参加活动')
        this.loading = false
        return
      }
      this.form.comeType = this.form.comeTypeChecked
      this.form.goType = this.form.goTypeChecked
      this.form.joinActivity = this.form.joinActivityChecked.join("|")
      this.$api.add(this.form).then(res => {
        if(res.code === 0) {
          // this.$toast({
          //   message: '保存成功',
          //   icon: 'success',
          //   forbidClick: true,
          // })
          this.loading = false
          this.$router.push({path: '/success'})
        }
      })
    },
    add() {
      this.form.detailDtoList.push({name: '', position: '', mobile: ''})
    },
    del(index) {
      this.form.detailDtoList.splice(index, 1)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    padding: 0 16px;
    background: #405ef2;
  }
  .header{
    margin: 0 -16px;
  }
  .form{
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    padding-bottom: 30px;
  }
  .input-box{
    background: #f6f7f9;
    border-radius: 4px;
    margin-top: 10px;
  }
  .form-box{
    margin-bottom: 10px;
  }
  .form-box-relative{
    position: relative;
  }
  .form-title{
    font-size: 16px;
    font-weight: normal;
  }
  .form-subtitle{
    font-size: 14px;
    margin-top: 10px;
  }
  .form-box-box{
    display: flex;
    position: relative;
  }
  .form-input-box{
    flex: 1;
  }
  .btn-box{
    width: 50px;
  }
  .btn-add{
    background: url("../assets/img/round_add_fill.png") no-repeat center;
    background-size: 30px;
    width: 50px;
    height: 30px;
    position: absolute;
    right: 0px;
    bottom: 7px;
  }
  .btn-del{
    background: url("../assets/img/minus-circle-fill.png") no-repeat center;
    background-size: 30px;
    width: 50px;
    height: 30px;
    margin-top: 15px;
  }
  .van-checkbox-group, .van-radio-group{
    margin-top: 10px;
    font-size: 14px !important;
  }
  .van-checkbox-group .van-checkbox{
    margin-top: 10px;
  }
  .contract{
    margin-top: 5px;
    font-size: 14px;
    color: #0605cb;
  }
  .contract-tel{
    margin-top: 5px;
  }
  .submit-btn{
    font-size: 16px;
    color: #fff;
    background-image: linear-gradient(to right , #5a9bf9, #5d77f2);
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    text-align: center;
  }
  .hint {
    color: #fff;
    padding: 25px 0;
    font-size: 12px;
    text-align: justify;
  }
  .come-hint{
    font-size: 12px;
    margin-top: 5px;
    color: #0605cb;
  }
  .contract-tel1{
    margin-left: 75px;
  }
  .contract-tel-label {
    width: 75px;
    display: inline-block;
    text-align: right;
  }
</style>
