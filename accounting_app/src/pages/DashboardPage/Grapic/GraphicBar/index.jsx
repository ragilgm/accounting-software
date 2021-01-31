import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class GraphicBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      month :["Januari", "Febuari", "Maret","April","Mei","Juni", "Juli","Agustus","September","Oktober","November","December"],
      labelMonth:"",
      anchor: null,
      allData: "",
      day: "",
      currentMonth: "",
      currentYear:"",
      pencil: [],
      binder: [],
      dataMonthly: "",
      data: {
        labels: [],
        datasets: [
          {
            label: 'pencil',
            data: [],
            backgroundColor: [],
            borderColor: [

            ],
            borderWidth: 1
          },
          {
            label: 'binder',
            data: [],
            backgroundColor: [],
            borderColor: [

            ],
            borderWidth: 1
          }
        ]
      },
    }
  }
  
  componentDidMount() { 
    const { month} = this.state
    var currentDate = new Date();
    this.setState({labelMonth:month[currentDate.getMonth()]})


    if (this.props.data !== undefined) { 
      this.salesCurrentMonth()
    }
  }

  salesCurrentMonth = () => {
    var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
    console.log(asiaTime)
    var d = new Date(asiaTime)
    console.log(d.getMonth() + 1);

    var data = this.props.data;
    data.forEach(d => { 
      var date = new Date(d.OrderDate)
      d.OrderDate = date;
    })

    var pencil = []
    var binder = []
    var day = [];

    var month = d.getMonth()+1;
    var entMonth = new Date(2020, month + 1, 0);
    console.log(d.getDate())
    console.log(d.getMonth()+1)
    console.log(entMonth.getDate())

    data.forEach(element => {
      
      if (element.OrderDate.getMonth() === (d.getMonth())) {
        if (element.Item === "Pencil") {
          pencil.push(element.Total)
        } else {
          binder.push(element.Total)
        }
      }

    })
    for (let i = 1; i <= entMonth.getDate(); i++) {
      day.push(i)
      this.state.data.datasets[0].backgroundColor.push("#e63c3c")
      this.state.data.datasets[1].backgroundColor.push("#2e162c")
     
    }
    console.log(day)
    this.setState({ labels: day })
    this.state.data.datasets[0].data = pencil
    this.state.data.datasets[1].data = binder
    this.state.data.labels = day
  }
  salesAnotherMonth = (month) => {
    var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
    console.log(asiaTime)
    var d = new Date(asiaTime)
    console.log(d.getMonth() + 1);

    var data = this.props.data; 
    data.forEach(d => { 
      var date = new Date(d.OrderDate)
      console.log(date);
      d.OrderDate = date;
    })

    var pencil = []
    var binder = []
    var day = [];

    var month = d.getMonth()+1;
    var entMonth = new Date(2020, month + 1, 0);
    console.log(d.getDate())
    console.log(d.getMonth()+1)
    console.log(entMonth.getDate())

    data.forEach(element => {
      
      if (element.OrderDate.getMonth() === (month)) {
        console.log(d.getMonth());
        console.log(element.OrderDate.getMonth());
        if (element.Item === "Pencil") {
          pencil.push(element.Total)
        } else {
          binder.push(element.Total)
        }
      }

    })
    for (let i = 1; i <= entMonth.getDate(); i++) {
      day.push(i)
      this.state.data.datasets[0].backgroundColor.push("#e63c3c")
      this.state.data.datasets[1].backgroundColor.push("#2e162c")
     
    }
    console.log(day)
    this.setState({ labels: day })
    this.state.data.datasets[0].data = pencil
    this.state.data.datasets[1].data = binder
    this.state.data.labels = day
  }



  handleClick = (event) => {
    this.setState({AnchorEl:event.currentTarget})
    console.log(event.currentTarget)
  };

   handleClose = () => {
     this.setState({ AnchorEl: null })
  };


  render() {
    return (
      <>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="card">
            <div class="card-body">
              <Bar
                width={10}
                height={250}
                options={{
                  legend: {
                    labels: {
                      fontSize: 12,
                      fontColor: 'black'
                    }
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        fontSize: 10,
                        // Include a dollar sign in the ticks
                        callback: function (bilangan, index, values) {
                          var number_string = bilangan.toString(),
                            sisa = number_string.length % 3,
                            rupiah = number_string.substr(0, sisa),
                            ribuan = number_string.substr(sisa).match(/\d{3}/g);

                          if (ribuan) {
                            var separator = sisa ? '.' : '';
                            rupiah += separator + ribuan.join('.');
                          }

                          return rupiah;
                        }

                      }
                    }],
                    xAxes: [{
                      ticks: {
                        beginAtZero: true,
                        fontSize: 10,

                      }
                    }],
                  },
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: `Performance ${this.state.labelMonthx}`,
                    fontSize: 15,
                  },
                }}
                data={this.state.data}
              />
            </div>
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



export default connect(mapStateToProps,mapDispatchToProps)(GraphicBar);
