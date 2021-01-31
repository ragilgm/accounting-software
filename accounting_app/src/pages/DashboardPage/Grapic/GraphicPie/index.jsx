import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect} from 'react-redux'

class GraphicPie extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalOmset: 0,
         totalCost: 0,
         totalSales:0,
         dataPie: {
            labels: ["NUTRICH/EGYPT/SC8602/JEFFRY", "NUTRICH/EGYPT/SC8603/JEFFRY"],
            datasets: [
               {
                  data:[50000,40000],
                  backgroundColor: ['#e63c3c', '#2e162c'],
                  borderColor: [
                  ],
                  borderWidth: 1
               }
            ]
         },
         options: {
            legend: { display: false },
            title: {
               display: true,
               text: 'Predicted world population (millions) in 2050'
            }
         },
         anchorEl: null,
      }
   }
   

   async componentDidMount() { 
      if (this.props.data !== undefined) { 
         await this.salesCurrentMonth()
         await console.log(this.state.dataPie.datasets[0].data)
      }
   }
 
   salesCurrentMonth = () => {
      var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
      var d = new Date(asiaTime)
      var data = this.props.data;
      data.forEach(d => { 
        var date = new Date(d.OrderDate)
        d.OrderDate = date;
      })
  
      var pencil = []
      var binder = []
  
      var month = d.getMonth()+1;
  
      data.forEach(element => {
        
        if (element.OrderDate.getMonth() === (month)) {
          if (element.Item === "Pencil") {
            pencil.push(element.Total)
          } else {
            binder.push(element.Total)
          }
        }
  
      })

      var totalPencil=0
      pencil.forEach(total => { 
         totalPencil+=parseInt(total)
      })

      var totalBinder = 0;
      binder.forEach(total => { 
         totalBinder+= parseInt(total)
      })

      var dataChart = []
      dataChart.push(totalPencil)
      dataChart.push(totalBinder)
   
      this.state.dataPie.datasets[0].data = dataChart
      
   }
   
   //  salesAnotherMonth = (month) => {
   //    var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
   //    var d = new Date(asiaTime)
  
   //    var data = this.props.data;
   //    data.forEach(d => { 
   //      var date = new Date(d.OrderDate)
   //      d.OrderDate = date;
   //    })
  
   //    var pencil = []
   //    var binder = []
   //    var day = [];
  
   //    var month = d.getMonth()+1;
   //    var entMonth = new Date(2020, month + 1, 0);
  
   //    data.forEach(element => {
        
   //      if (element.OrderDate.getMonth() === (month)) {
   //        console.log(d.getMonth());
   //        console.log(element.OrderDate.getMonth());
   //        if (element.Item === "Pencil") {
   //          pencil.push(element.Total)
   //        } else {
   //          binder.push(element.Total)
   //        }
   //      }
  
   //    })
   //    for (let i = 1; i <= entMonth.getDate(); i++) {
   //      day.push(i)
   //      this.state.data.datasets[0].backgroundColor.push("#e63c3c")
   //      this.state.data.datasets[1].backgroundColor.push("#2e162c")
       
   //    }
   //    this.setState({ labels: day })
  
 
   //  }
  
  

   render() {


         return (
            <>
               <div class="col-md-6">
                  <div class="card">
                     <h5 className="text-center font-weight-bold">Penjualan Bulan Ini</h5>
                     <i class="fas fa-search"></i>
                     <div class="card-body">
                           <Pie
                           width={10}
                           height={300}
                           options={{
                              tooltips: {
                                 callbacks: {
                                    label: function(tooltipItem, data) {
                                      //get the concerned dataset
                                      var dataset = data.datasets[tooltipItem.datasetIndex];
                                      //calculate the total of this data set
                                      var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                        return previousValue + currentValue;
                                      });
                                      //get the current items value
                                      var currentValue = dataset.data[tooltipItem.index];
                                      //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                                      var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                                
                                      return percentage + "%";
                                    }
                                 }
                             },
                      
                              legend: {
                                 labels: {
                                    fontSize: 12,
                                    fontColor: 'black'
                                 }
                              },
                              maintainAspectRatio: false,
                              title: {
                                 display: true,
                                 text: `Performance ${this.state.currentMonth} ${this.state.currentYear}`,
                                 fontSize: 12,
                                 fontColor: "rgba(255, 159, 64, 0.1)",
                              },
                           }}
                           data={this.state.dataPie}
                        />   
                     
                     </div>
                     <p className="font-weight-bold mt-2">Total Omset Bulan Ini</p>

                  </div>
               </div>

            </>
         );
      }
   }

const mapStateToProps = (state) => ({
   data: state.dataImport,
 })
 
 const mapDispatchToProps = (dispatch) => ({
   dataImport: (data) => dispatch({ type: "DATA", payload: data }),
 
 })
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(GraphicPie);
