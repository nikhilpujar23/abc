let num_rows
let knapsackCapacity

function createTable() {
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    let theader = '<table class="table text-center" style="padding:5px; width:800px; margin-left:265px; border-radius:8px;margin-top:15px;border: none;" id="table" > <tr style="padding:20px;text-align:center;" style="color: black;" ><th scope="col" style="color: black;">Items</th> <th scope="col" style="color: black;">Profit</th> <th scope="col" style="color: black;">Weight</th></tr>';
    let tbody = '';

    for (let i = 0; i < num_rows; i++) {

        tbody += '<tbody><tr style="color: black; padding: 10px; margin: 10px;">';
        tbody += '<td>';
        let j=i+1
        tbody += 'Item ' +j 
        tbody += '</td>'
        for (let j = 0; j < 2; j++) {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" style="width: 320px; height: 45px;" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    let tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}

let kpResultantProfitId = document.getElementById("kpResultantProfit")
let kpProfitId = document.getElementById("kpProfit")
let kpWeightId = document.getElementById("kpWeight")
let kpProfitWeightId = document.getElementById("kpProfitWeight")

var kp01ResultantProfitId = document.getElementById("kp01ResultantProfit")


let weightValue, profitValue
let profit = [];
let weight = [];
let profit_weight = []
let tempList = []
let i, j, knapsackResultantProfit = 0;

function generateResult() {
    let resultClass = document.getElementsByClassName("result");
    document.getElementById("resultContainer1").style.height="auto";
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    
    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    profit_weight = []
    tempList = []

    console.log(resultClass.length);
    
    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    let tableId = document.getElementById("table")
    for (let i = 1; i <= num_rows; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }
    knapsack01Algorithm()
    sortLists()

    console.log("profit = " + profit);
    console.log("weight = " + weight);
    console.log("profit/weight = " + profit_weight);
    knapsackAlgorithm()
    console.log(knapsackResultantProfit);
}

function sortLists() {
    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = (profit[i] / weight[i])
    }       
    console.log(tempList);
    let list = [];
    for (i = 0; i < num_rows; i++)
        list.push({ 'profit_weight': profit_weight[i], 'profit': profit[i], 'weight': weight[i] });
    list.sort(function (a, b) {
        return ((a.profit_weight > b.profit_weight) ? -1 : ((a.profit_weight == b.profit_weight) ? 0 : 1));
    });

    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = +(list[i].profit_weight).toFixed(3)
        profit[i] = list[i].profit;
        weight[i] = list[i].weight;
    }
}
function knapsackAlgorithm() {

    for (i = 0; i < num_rows; i++) {
        if (weight[i] <= knapsackCapacity) {
            knapsackCapacity -= weight[i]
            knapsackResultantProfit += +profit[i]
            tempList[tempList.indexOf(profit[i])] = 1
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = +knapsackResultantProfit + +(profit[i] * (knapsackCapacity / weight[i]))
            tempList[tempList.indexOf(profit[i])] = knapsackCapacity + "/" + weight[i]
            knapsackCapacity = 0
        }
        else {
            tempList[tempList.indexOf(profit[i])] = 0
        }
    }

    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3)
    kpProfitId.innerHTML = profit
    kpWeightId.innerHTML = weight
    kpProfitWeightId.innerHTML = profit_weight

}

function knapsack01Algorithm() {
    var knapsackTable = new Array(num_rows)
    for (i = 0; i <= num_rows; i++) {

        knapsackTable[i] = Array(knapsackCapacity)
        for (j = 0; j <= knapsackCapacity; j++) {
            knapsackTable[i][j] = 0
        }
    }

    var theader = '<table class="table table-bordered">';
    var tbody = '';

    for (i = 1; i <= num_rows; i++) {
        for (j = 0; j <= knapsackCapacity; j++) {
            if (weight[i - 1] <= j) {
                knapsackTable[i][j] = (Math.max(knapsackTable[i - 1][j], +knapsackTable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
            else {
                knapsackTable[i][j] = knapsackTable[i - 1][j]
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
        }
        tbody += '</tr></tbody>\n';
    }

    var tfooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = theader + tbody + tfooter;

    console.log(knapsackTable);
    console.log(knapsackTable[num_rows][knapsackCapacity]);


    kp01ResultantProfitId.innerHTML = knapsackTable[num_rows][knapsackCapacity]

}

