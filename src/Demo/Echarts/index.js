function resize(){
  document.body.style.width=document.documentElement.clientWidth+"px";
  let wh=document.documentElement.clientWidth/document.documentElement.clientHeight
  document.getElementById('app').style.top=0+"px"
  if(wh>16/9){ // 宽屏
    let vh=document.documentElement.clientHeight
    let vw=vh/9*16
    document.documentElement.style.fontSize = vw/38.4+'px';
    document.getElementById('app').style.width=vw+"px";
    document.getElementById('app').style.height=vh+"px";
  }else if(wh<16/9){ // 竖屏
    let vw=document.documentElement.clientWidth
    let vh=vw/16*9
    let ch=(document.documentElement.clientHeight-vh)/2
    document.documentElement.style.fontSize = vw/38.4+'px';
    document.getElementById('app').style.width=vw+"px"
    document.getElementById('app').style.height=vh+"px"
    document.getElementById('app').style.top=ch+"px"
  }else{ // 16/9
    let vw=document.documentElement.clientWidth
    let vh=vw/16*9
    document.documentElement.style.fontSize = vw/38.4+'px';
    document.getElementById('app').style.width=vw+"px"
    document.getElementById('app').style.height=vh+"px"
  }
}
resize()
window.addEventListener('resize',function () {//执行
  resize()
})

// 加载中图标
Vue.component('loading',{
  template:`<div style="position:absolute;width:100%;height:100%;z-index:1;background:#04092e;opacity:1;">
    <p class="anima" style="position: absolute;top: calc(50% - 0.5rem);width: 1rem;height: 1rem;border-radius: 50%;left: calc(50% - 0.5rem);border: 0.2rem solid #020a2c;border-top: 0.2rem solid #36a0f3;"></p>  
  </div>`
})
// 延迟分布双环形图
Vue.component('two-pic',{
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.getInstanceByDom(document.getElementById('delay'));  
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    let myChart = echarts.init(document.getElementById('delay'));  
    let option=this.reOption();
    if(myChart){myChart.setOption(option);}
  },
  methods:{
    reOption:function(){
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option = {
        textStyle: {
          fontFamily:'PingFang',
        },
        legend: {
          left: 'center',
          top:(0.8*fz),
          itemWidth:(0.3*fz),
          itemHeight:(0.1*fz),
          itemGap:(0.4*fz),
          textStyle:{
            color:'#888cad',
            fontSize:(0.24*fz),
          },
          data: ['小于1s', '1s-3s之间', '大于3s']
        },
        graphic:[{
          type:'text',
          position:[2.2*fz,2.3*fz],
          style:{
            text:'统一支付内部\n处理时长',
            textAlign:'center',
            fill:'#00a1e4',
            fontSize:(0.2*fz),
          }
        },{
          type:'text',
          position:[6.7*fz,2.3*fz],
          style:{
            text:'省侧\n处理时长',
            textAlign:'center',
            fill:'#00a1e4',
            fontSize:(0.2*fz),
          }
        },],
        series:[
          {
            type: 'pie',
            radius: ["30%", "40%"],
            center: ['25%', '60%'],
            label:{
              fontSize:(0.2*fz),
              color:"#FFF",
              position:"outside",
              formatter:(params) => {
                let str = params.percent+"%" +"\n累计:"+params.value
                if(params.name==""){return ""}
                return str
              },
            },
            labelLine:{
              length2:0,
            },
            data: [
              {value: 26, name: '1s-3s之间',itemStyle:{color:"#24c768"}},
              {value: 31, name: '大于3s',itemStyle:{color:"#2196F3"}},
              {value: 33, name: '小于1s',itemStyle:{color:"#ffd900"}},
            ]
          },
          {
            type: 'pie',
            radius: ["30%", "40%"],
            center: ['75%', '60%'],
            label:{
              fontSize:(0.2*fz),
              color:"#FFF",
              position:"outside",
              formatter:(params) => {
                let str = params.percent+"%" +"\n累计:"+params.value
                if(params.name==""){return ""}
                return str
              },
            },
            labelLine:{
              length2:0,
            },
            data: [
              {value: 26, name: '小于1s',itemStyle:{color:"#ffd900"}},
              {value: 31, name: '大于3s',itemStyle:{color:"#2196F3"}},
              {value: 33, name: '1s-3s之间',itemStyle:{color:"#24c768"}},
            ]
          }
        ]
      };
      return option;
    },
  },
  template:`<div class="twopie" id="delay"></div>`
})

// 充值业务预测图
Vue.component('recharge',{
  data:function(){
    return({
      load:true,
    })
  },
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.getInstanceByDom(document.getElementById('chargeBox'));  
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    setTimeout(()=>{
      this.load=false
      let myChart = echarts.init(document.getElementById('chargeBox'));  
      let option=this.reOption();
      if(myChart){myChart.setOption(option);}
    },1000)
  },
  methods:{
    reOption:function(){
      let fz=parseFloat(document.documentElement.style.fontSize)
      var dis = [0,100,200,300,400,500,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,750];
      var name = ['11:00', '15:00', '19:00', '23:00', '03:00', '07:00', '11:00 ',
       '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07', '11:07', '11:09', '11:10', '11:11', '11:12', '11:13 ', '11:14', '11:15'];
      let option = {
        textStyle: {fontFamily:'PingFang',},
        tooltip : {trigger: 'axis',},
        legend: {
          left: 'center',
          top:(0.8*fz),
          itemWidth:(0.3*fz),
          itemHeight:(0.1*fz),
          itemGap:(0.4*fz),
          textStyle:{
            color:'#888cad',
            fontSize:(0.24*fz),
          },
          icon:'rect',
          data:['容量线','实际值','预测值','预测区间']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip:{
          trigger:'axis',
          textStyle:{
            fontSize:(0.2*fz),
          },
          backgroundColor:'#2196f3', 
          formatter:(obj)=>{
            var ax = dis.indexOf(obj[0].axisValue);
            let str=name[ax]+'<br/>'
            for(let i in obj){
              if(obj[i].seriesName=="实际值"||obj[i].seriesName=="预测值"){
                str+=obj[i].seriesName+'：'+obj[i].value[1]+'<br/>'
              }
            }
            return str
          }
        },
        xAxis: {
          type: 'value',
          interval:1,
          scale:false,
          boundaryGap :true,
          axisLine: {
            onZero: false,
            lineStyle:{width:0},
          },
          axisTick:{show:false},
          axisLabel: {
            fontSize:0.2*fz,
            showMinLabel:true,
            color:"#fff",
            formatter: function(value, index) {
              var i = dis.indexOf(value);
              if(i>-1&&i<7||i==21){
                return name[i];
              }else{
                return '{a|' + value + '}'
              }
            },
            rich: {a: {color: 'transparent'}}
          },
          splitLine: {show: false},
        },
        yAxis: [{
          type: 'value',
          min: 0,
          max: 500,
          interval: 100,
          axisLabel: {
            fontSize:0.2*fz,
            color:"#fff",
          },
          splitLine: {
            show: true,
            lineStyle:{color:'#19395a'},
          },
        }],
        series: [
          {
            name:'容量线',
            type:'line',
            lineStyle: {color: '#ffd900',type: 'dashed',width:1},
            itemStyle:{color: '#ffd900',},
            symbol: 'none',
            data:[
              [0, 450],[100, 450],[200, 450],[300, 450],[400, 450],[500, 450],[600, 450],
              [610, 450],[620, 450],[630, 450],[640, 450],[650, 450],[660, 450],[670, 450],[680, 450],[690, 450],
              [700, 450],[710, 450],[720, 450],[730, 450],[740, 450],[750, 450],
            ]
          },
          {
            name:'实际值',
            type:'line',
            smooth: true,
            color: '#00a1e4',
            lineStyle: {width:1},
            markPoint:{
              label:{
                show:true,
                color:"#fff",
                align:'center',
                lineHeight:0.35*fz,
                fontSize:0.28*fz,
                borderRadius:3,
                padding:[5,8,5,8],
                offset:[-1*fz,-0.4*fz],
                backgroundColor:'#2196f3',
                position: 'start',
                formatter:(obj)=>{
                  let data=obj.data;
                  let str=data.name+": "+data.yAxis;
                  return str
                }
              },
              symbol:'circle',
              symbolSize:5,
              data:[{name:"当前值",xAxis:600,yAxis:365}]
            },
            markLine:{
              symbol:'none',
              data:[{name:'当前值',xAxis:600}],
              label:{show:false},
              lineStyle:{color:'#00a1e4',width:1,type:'solid',}
            },
            symbol: 'none',
            data:[[0, 400],[100, 405],[200, 400],[300, 350],[400, 250],[500, 320],[600, 365],]
          },
          {
            name:'预测值',
            type:'line',
            smooth: true,
            color: '#ed4949',
            markPoint:{
              label:{
                show:true,
                color:"#fff",
                align:'center',
                lineHeight:0.35*fz,
                borderRadius:3,
                fontSize:0.28*fz,
                padding:[5,8,5,8],
                backgroundColor:'#ed4949',
                offset:[1*fz,1.2*fz],
                formatter:(obj)=>{
                  let data=obj.data;
                  let str=data.name+": "+data.yAxis;
                  return str
                }
              },
              symbol:'circle',
              symbolSize:5,
              data:[{name:"预测值",xAxis:610,yAxis:340}]
            },
            markLine:{
              symbol:'none',
              data:[{name:'当前值',xAxis:610}],
              label:{show:false},
              lineStyle:{color:'#ed4949',width:1,type:'solid',}
            },
            symbol: 'none',
            data:[
              [0, 270],
              [100, 320],
              [200, 300],
              [300, 270],
              [400, 250],
              [500, 340],
              [600, 340],
              [610, 346],
            ],   
          },
          {
            name:'预测值',
            type:'line',
            smooth: true,
            lineStyle: {
              color: '#ed4949',
              type: 'dashed',
              width:1,
            },
            symbol:'none',
            data:[[610, 346],[620, 345],[630, 343],[640, 342],[650, 340],[660, 340],[670, 338],[680, 339],[690, 340],
            [700, 342],[710, 343],[720, 344],[730, 345],[740, 350],[750, 370],],  
          },
          {
            name:'预测区间',
            type:'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {color: 'rgba(237,73,73,0.3)',},
            color: 'rgba(237,73,73,0.3)',
            data:[
              [0, 320],[100, 370],[200, 350],[300, 320],[400, 300],[500, 390],[600, 396],
              [610, 396],[620, 395],[630, 393],[640, 392],[650, 390],[660, 390],[670, 388],[680, 389],[690, 390],
              [700, 392],[710, 393],[720, 394],[730, 395],[740, 400],[750, 420],
            ]
          },
          {
            name:'填充区域',
            type:'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {
              color: '#000b2b',
              origin: 'start',       
            },
            color: 'rgba(255,0,0,0.2)',
            data:[
              [0, 220],[100, 270],[200, 250],[300, 220],[400, 200],[500, 290],[600, 296],
              [610, 296],[620, 295],[630, 293],[640, 292],[650, 290],[660, 290],[670, 288],[680, 289],[690, 290],
              [700, 292],[710, 293],[720, 294],[730, 295],[740, 300],[750, 320],
            ]
          }, 
        ],
      };
      return option
    }
  },
  template:`<div class="recharge">
    <loading v-if="load"></loading>
    <div class="chargeBox" id="chargeBox"></div>
    <div class="chargeTit">
      <p>系统状态预测：
        <span class="chaBottom">正常</span>准确率：
        <span class="chaSpan">65%</span>
      </p>
    </div>
  </div>`
})


// 延迟分布折线图
Vue.component('top-line',{
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.getInstanceByDom(document.getElementById('delay2'));  
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    let myChart = echarts.init(document.getElementById('delay2'));  
    let option=this.reOption();
    if(myChart){myChart.setOption(option);}
  },
  methods:{
    reOption:function(){
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option = {
        textStyle: {
          fontFamily:'PingFang',
        },
        tooltip: {
          trigger: 'axis',
          textStyle:{fontSize:0.2*fz},
        },
        legend: {
          left: 'center',
          top:'5%',
          itemWidth:(0.3*fz),
          itemHeight:(0.1*fz),
          itemGap:0.4*fz,
          textStyle:{
             color:'#888cad',
             fontSize:(0.24*fz),
          },
          data: ['统一支付内部处理时长均值', '省侧处理时长均值',],
          icon:"rect",
        },
        grid: {
          left: '3%',
          top:'27%',
          right: '7%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel:{
              fontSize:0.2*fz,
              color:"#fff",
            },
            data: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel:{
              fontSize:0.2*fz,
              color:"#fff",
            },
            splitLine:{
              lineStyle:{
                color:"rgba(101,198,231,0.25)"
              }
            },
            splitNumber:3,
          }
        ],
        series: [
          {
            name: '统一支付内部处理时长均值',
            type: 'line',
            itemStyle:{
              color:"#2b80ff",
            },
            lineStyle:{
              width:0.5,
            },
            areaStyle: {
              color :new echarts.graphic.LinearGradient(0,0,0,1,[
                {offset: 0,color: 'rgba(67,144,250,0.4)'},
                {offset: 0.7,color: 'rgba(54,172,254,0.1)'},
              ]),
            },
            data: [60, 80, 85, 89, 65, 80, 65]
          },
          {
            name: '省侧处理时长均值',
            type: 'line',
            lineStyle:{
              width:0.5,
            },
            itemStyle:{color:"#04cdf4"},
            areaStyle: {
              color :new echarts.graphic.LinearGradient(0,0,0,1,[
                {offset: 0,color: 'rgba(4,205,244,0.4)'},
                {offset: 0.7,color: 'rgba(4,205,244,0.1)'},
                {offset: 1,color: 'rgba(4,205,244,0)'}
              ]),
            },
            data: [50, 60, 75, 61, 50, 65, 80]
          },
        ]
      };
      return option;
    },
  },
  template:`<div class="line" id="delay2"></div>`
})

// 业务成功率折线图
Vue.component('rate-line',{
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.getInstanceByDom(document.getElementById('secsrateBox'));  
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    let myChart = echarts.init(document.getElementById('secsrateBox'));  
    let option=this.reOption();
    if(myChart){myChart.setOption(option);}
  },
  methods:{
    reOption:function(){
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option = {
        textStyle: {
          fontFamily:'PingFang',
        },
        tooltip: {
          trigger: 'axis',
          textStyle:{
            fontSize:(0.2*fz),
            lineHeight:0.35*fz,
          },
          backgroundColor:'#2196F3',
          formatter(arr){
            let b=""
            for(let i in arr){
              let text=arr[i].seriesName+"值:"+arr[i].value+"%";
              b=b+text+"<br/>"
            }
            return b
          },
          backgroundColor:'#2196F3'
        },
        legend: {
          data: ['昨日', '今日',],
          icon:"rect",
          top:'12%',
          itemWidth:(0.3*fz),
          itemHeight:(0.1*fz),
          itemGap:0.4*fz,
          textStyle:{
             color:'#888cad',
             fontSize:(0.24*fz),
          },
        },
        grid: {
          top: '24%',
          left: '3%',
          right: '8%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            fontSize:0.2*fz,
            color:"#fff",
          },
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
        }],
        yAxis: [{
          axisLabel:{
            fontSize:0.2*fz,
            color:"#fff",
            formatter:'{value} %',
            lineStyle:{
              color:'rgba(0,0,0,0)'
            }
          },
          splitLine:{
            lineStyle:{
              color:"rgba(101,198,231,0.25)"
            }
          },
          min:0,
          max:100,
          splitNumber:5,
        }],
        label:{
          formatter : '{b}<br/>{a} : {c}%',
        },
        series: [
          {
            name: '昨日',
            type: 'line',
            itemStyle:{color:"#2196F3"},
            lineStyle:{width:0.5,},
            areaStyle: {
              color :new echarts.graphic.LinearGradient(0,0,0,1,[
                {offset: 0,color: 'rgba(4,204,250,0.4)'},
                {offset: 0.7,color: 'rgba(54,172,254,0.1)'},
              ]),
            },
            markPoint:{
              label:{
                show:true,
                color:"#fff",
                align:'center',
                verticalAlign: 'bottom',
                lineHeight:0.3*fz,
                fontSize:0.25*fz,
                borderRadius:3,
                padding:0.1*fz,
                backgroundColor:'#2196F3',
                position: [-0.9*fz, -0.7*fz],
                formatter:(obj)=>{
                  let data=obj.data;
                  let str=data.a+":  "+data.yAxis+'%\n'+data.b+":  "+data.byAxis+"%";
                  return str
                }
              },
              symbol:'circle',
              symbolSize:0.1,
              data:[{a:"当前值",xAxis:"12:00",yAxis:34,b:"昨日值",byAxis:30}]
            },
            markLine:{
              symbol:'none',
              data:[{name:'当前值',xAxis:"12:00"}],
              label:{show:false},
              lineStyle:{
                color:'#5389db',
                width:1,
                type:'solid',
              }
            },
            data: [10, 20, 25, 34]
          },
          {
            name: '今日',
            type: 'line',
            itemStyle:{color:"#78daff"},
            lineStyle:{width:0.5,},
            areaStyle: {
              color :new echarts.graphic.LinearGradient(0,0,0,1,[
                {offset: 0,color: 'rgba(67,144,244,0.8)'},
                {offset: 0.7,color: 'rgba(67,144,244,0.1)'},
                {offset: 1,color: 'rgba(4,205,244,0)'}
              ]),
            },
            data: [15, 25, 30, 45, 40, 60, 80]
          },
        ]
      };
      return option;
    },
  },
  template:`<div class="secsrateBox" id="secsrateBox"></div>` 
})

// 分省业务详情地图
Vue.component('china-map',{
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.init(document.getElementById('mapBox'));
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    let myChart = echarts.init(document.getElementById('mapBox'));  
    let option=this.reOption();
    if(myChart){myChart.setOption(option);}
  },
  methods:{
    reOption:function(){
      let dataList = [{name: "南海诸岛",value: 0},{name: '北京',value: 54},{name: '天津',value: 13},{name: '上海',value: 40},{name: '重庆',value: 75},{name: '河北',value: 13},{name: '河南',value: 83},{name: '云南',value: 11},{name: '辽宁',value: 19},{name: '黑龙江',value: 15},{name: '湖南',value: 69},{name: '安徽',value: 60},{name: '山东',value: 39},{name: '新疆',value: 4},{name: '江苏',value: 31},{name: '浙江',value: 104},{name: '江西',value: 36},{name: '湖北',value: 1052},{name: '广西',value: 33},{name: '甘肃',value: 7},{name: '山西',value: 9},{name: '内蒙古',value: 7},{name: '陕西',value: 22},{name: '吉林',value: 4},{name: '福建',value: 18},{name: '贵州',value: 5},{name: '广东',value: 98},{name: '青海',value: 1},{name: '西藏',value: 10},{name: '四川',value: 44},{name: '宁夏',value: 4},{name: '海南',value: 22},{name: '台湾',value: 0},{name: '香港',value: 5},{name: '澳门',value: 5}];
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option = {
        visualMap: {
          pieces: [{
            gt: 100,
            color: new echarts.graphic.LinearGradient(0,0,0,1,[
              {offset: 0,color: '#ef614e'},
              {offset: 1,color: '#f1965c'}
            ]),
          }, {
            lte: 100,
            gt: 0,
            color:  new echarts.graphic.LinearGradient(0,0,0,1,[
              {offset: 0,color:"#2898f2"},
              {offset: 1,color: '#9bd8f4'}
            ]),
          }],
          show:false
        },
        geo: {
          map: "china",
          zoom: 1.15,
          top: 2*fz,
          regions: [{
            name: "南海诸岛",
            value: 0,
            itemStyle: {normal: {opacity: 0,}},
            label: {show: false},
          }],
          label: {
            show: true,
            fontSize: 0.15*fz,
            color: "#fff",
          },
          itemStyle: {
            normal: {borderColor: "#2678d9"},
            emphasis: {areaColor: "#f2d5ad",}
          }
        },
        series: [{
          name: "分省业务详情",
          type: "map",
          geoIndex: 0,
          data: dataList
        }]
      };
      return option;
    },
  },
  template:`<div class="mapbox" id="mapBox"></div>`
})

// 告警分布半环状图
Vue.component('report-pie',{
  mounted:function(){
    window.addEventListener('resize',()=>{//执行
      let myChart = echarts.getInstanceByDom(document.getElementById('reportPie'));  
      let option=this.reOption();
      if(myChart){
        myChart.resize()
        myChart.setOption(option);
      }
    })
    let myChart = echarts.init(document.getElementById('reportPie'));  
    let option=this.reOption();
    if(myChart){myChart.setOption(option);}
  },
  methods:{
    reOption:function(){
      let fz=parseFloat(document.documentElement.style.fontSize)
      let option = {
        legend: {
          left: 'center',
          top:(0.8*fz),
          itemWidth:(0.3*fz),
          itemHeight:(0.1*fz),
          itemGap:(0.4*fz),
          textStyle:{
            color:'#888cad',
            fontSize:(0.24*fz),
          },
          data: [ '省前置', '核心', '商户前置']
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: ["15%","80%"],
            roseType: 'radius',
            hoverOffset:5,
            top:-1*fz,
            label:{
              fontSize:0.20*fz,
              color:"#FFF",
              position:"outside",
              formatter:(params) => {
                let str = "     "+params.percent*2+"%      " +"\n累计告警:"+params.value
                if(params.name==""){return ""}
                return str
              },
            },
            labelLine:{
              length:0,
            },
            itemStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffsetX:20,
              shadowBlur: 20  
            },
            data: [
              {value: 50, name: '',itemStyle: {color: "rgba(0,0,0,0)"}},
              {value: 21, name: '商户前置',itemStyle:{color:"#00a1e4"}},
              {value: 33, name: '核心',itemStyle:{color:"#24c768"}},
              {value: 46, name: '省前置',itemStyle:{color:"#ffd900"}},
              {value: 50, name: '',itemStyle: {color: "rgba(0,0,0,0)"}},
            ]
          }
        ]
      };
      return option;
    },
  },
  template:`<div class="reportPie" id="reportPie"></div>` 
})