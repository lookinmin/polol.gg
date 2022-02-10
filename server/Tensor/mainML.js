const tf = require('@tensorflow/tfjs');
const dfd = require('danfojs-node');
var mysql = require('mysql2');
const port = require('../DataBase/port/SQLport');
const Edu = require("../Tensor/EduData");

var connection;
const sql = "REPLACE INTO `polol`.`match` (`Lrate1`, `Rrate1`, `Lrate2`, `Rrate2`) VALUES (?, ?, ?, ?);";
let isSuccess = "false";

const precdictMain = async () => {
  connection = await mysql.createPool(
    port
  );
};

const func=async()=>{//데이터 읽는 함수 임시임...

  let scaler = new dfd.MinMaxScaler()
  const Data = await Edu.Data();
  const temp=new dfd.DataFrame(Data);//원시데이터
  let indeVal = temp.loc({columns: ["date","Player"]});
  const testval=indeVal.loc({rows:["0"]})
  
  let deVal = temp.loc({columns: ["Kills", "Deaths","Assists","CSM","GPM","Vision Score","DPM","KP","GD15"]})
  scaler.fit(deVal);
  let df_enc = scaler.transform(deVal);


  // let tf_Cause = indeVal.tensor;
  // const tt=tf.tensor([[112,1,1]]);
  // tt.print();
  // let tf_Result = deVal.tensor;
  // let tf_test=testval.tensor;

  // // 2. 모델의 모양을 만듭니다. 
  // var X = tf.input({ shape: [2] });    //INPUT LAYER
  // var H1 = tf.layers.dense({ units: 9, activation:'relu' }).apply(X);        // HIDDEN LAYER
  // var Y = tf.layers.dense({ units: 9 }).apply(H1);      //OUTPUT LAYER
  // var model = tf.model({ inputs: X, outputs: Y });
  // var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError }
  // model.compile(compileParam);

  // var fitParam = { 
  //   epochs: 1000, 
  //   callbacks:{
  //     onEpochEnd:
  //       function(epoch, logs){
  //         console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
  //       }
  //   }
  // } // loss 추가 예제
  // model.fit(tf_Cause, tf_Result, fitParam).then(function (rr) {
      
  //     // 4. 모델을 이용합니다. 
  //     // 4.1 기존의 데이터를 이용
  //     // var test={date:"0209",match:1,Player:1};
  //     // const zz=new dfd.DataFrame(test);//원시데이터
  //     // test=zz.tensor;
  //     var predictrate = model.predict(tt);
  //     predictrate.print();
  // });  
}
module.exports = { result: func() }

// precdictMain()
//   dfd.readCSV('http://localhost:3002/data').then(function(data){
//     console.log(data);
//     data.print();
//   })
    
//   .finally(()=> {
    
//   })