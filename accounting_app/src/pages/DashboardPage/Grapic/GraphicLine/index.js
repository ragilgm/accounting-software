import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class GraphicLine extends Component {
   constructor(props) {
      super(props);
      this.state = {

         dataPie: {
            labels: ["NUTRICH/EGYPT/SC8602/JEFFRY", "NUTRICH/EGYPT/SC8603/JEFFRY"],
            datasets: [
               {
                  label: 'NUTRICH/EGYPT/SC8602/JEFFRY',
                  data: ["12341234", "2341324"],
                  backgroundColor: ['#e63c3c', '#2e162c'],
                  borderColor: [
                  ],
                  borderWidth: 1
               }
            ]
         },
         options: {

         },
         anchorEl: null,
         age: ""
      }
   }

   render() {
      return (
         <>
            <div class="col-md-6">
               <div class="card">
                  <h5 className="text-center font-weight-bold">Penjualan Bulan Ini</h5>
                  <i class="fas fa-search"></i>
                  <div class="card-body">
                     <Line
                        width={10}
                        height={300}
                        options={{
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

export default GraphicLine;