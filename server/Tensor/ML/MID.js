const tf = require('@tensorflow/tfjs');
const dfd = require('danfojs-node');
var mysql = require('mysql2');
const port = require('../../DataBase/port/pololPort');

var connection;
const sql = "REPLACE INTO `polol`.`match` (`Lrate1`, `Rrate1`, `Lrate2`, `Rrate2`) VALUES (?, ?, ?, ?);";
let isSuccess = "false";

const precdictMain = async () => {
    connection = await mysql.createPool(
        port
    );
};
const makedataset=(prim_data)=>{
    var dividepoint = ((prim_data.length-6)).toFixed(0);
    var dataset=[];
    
    for(let i=0;i<dividepoint;i++){
        var train_set={
            match0:prim_data[i].KDA,
            match1:prim_data[i+1].KDA,
            match2:prim_data[i+2].KDA,
            match3:prim_data[i+3].KDA,
            match4:prim_data[i+4].KDA,
            match5:prim_data[i+5].KDA,
            result:prim_data[i+6].KDA
        };
        dataset.push(train_set);
    }
    return dataset;
}
const makemodel=(edudata)=>{
    /*학습 데이터 */
    var train_set = new dfd.DataFrame(edudata);//독립 변수
    var X_train = train_set.loc({columns: ["match0", "match1", "match2", "match3", "match4", "match5"]});//독립 변수
    var Y_train = train_set.loc({columns: ["result"]}); //종속변수

    /*검증 데이터 */
    // var X_val = new dfd.DataFrame(edudata.X_val);//독립 변수
    // X_val.print();
    // var Y_val = new dfd.DataFrame(edudata.Y_val); //종속변수
    // Y_val.print();

    var X = tf.input({
        shape: [6]
    }); //INPUT LAYER
    var H1 = tf.layers.dense({
        units: 6,
        activation: 'relu'
    }).apply(X); // HIDDEN LAYER
    var Y = tf.layers.dense({
        units: 1
    }).apply(H1); //OUTPUT LAYER
    var model = tf.model({
        inputs: X,
        outputs: Y
    });
    var compileParam = {
        optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError
    }
    model.compile(compileParam);
    var fitParam = {
        epochs: 20000,
        callbacks: {
            onEpochEnd: function (epoch, logs) {
                console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
            }
        }
    }
    model.fit(X_train.tensor, Y_train.tensor, fitParam).then(function (rr) {
        var predictrate = model.predict(X_train.tensor);
        predictrate.print();
    }) //모델 학습
}
const fun = (primitiv) => {
    console.log("fucking start");
    var KDA_data=makedataset(primitiv);
    makemodel(KDA_data);
    

    // 2. 모델의 모양을 만듭니다. 
    // var X = tf.input({
    //     shape: [1]
    // }); //INPUT LAYER
    // var H1 = tf.layers.dense({
    //     units: 9,
    //     activation: 'relu'
    // }).apply(X); // HIDDEN LAYER
    // var Y = tf.layers.dense({
    //     units: 9
    // }).apply(H1); //OUTPUT LAYER
    // var model = tf.model({
    //     inputs: X,
    //     outputs: Y
    // });
    // var compileParam = {
    //     optimizer: tf.train.adam(100), loss: tf.losses.meanSquaredError
    // }
    // model.compile(compileParam);
    // var fitParam = {
    //     epochs: 3000,
    //     callbacks: {
    //         onEpochEnd: function (epoch, logs) {
    //             console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
    //         }
    //     }
    // }
    // model.fit(tf_Cause, tf_Result, fitParam).then(function (rr) {

    //           // 4. 모델을 이용합니다. 
    //           // 4.1 기존의 데이터를 이용
    //           // var test={date:"0209",match:1,Player:1};
    //           // const zz=new dfd.DataFrame(test);//원시데이터
    //           // test=zz.tensor;
    //           var predictrate = model.predict(tf_Cause);
    //           predictrate.print();
    // }
    // ) //모델 학습
}
module.exports = fun;