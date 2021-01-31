import React, { Component } from 'react';
import "./style.css"
import { InputText, SelectInput, Progress } from '../../components'
import Hotkeys from 'react-hot-keys';
import { withRouter } from 'react-router';

class Form extends Component {
   constructor(props) {
      super(props);
      this.state = {
         step: 0,
         allstep: 6,
         items: [],
         output: 'Hello, I am a component that listens to keydown and keyup of a',
      }
   }

   stepValue = [
      {
         step: 0,
         value: "input spesifikasi"
      },
      {
         step: 1,
         value: "input satuan"
      },
      {
         step: 2,
         value: "input stock"
      },
      {
         step: 3,
         value: "input pajak"
      },
      {
         step: 4,
         value: "input harga jual"
      },
      {
         step: 5,
         value: "input akutansi"
      },
   ]

   navLink = () => {

   }

   setStep = (e) => {
      // console.log(this.state.step)
      console.log(e.target.className)
      console.log(e.target.name)
      var step = parseInt(e.target.name)
      this.setState({ step: step })
   }

   nextHandler = async () => {
      var { step} = this.state
      if (step !== 5) { 
         await this.setState({ step: step + 1 })

         var tab = await document.getElementsByClassName("fade");
         await console.log(tab)
         await console.log(tab[step]);
         await tab[step].classList.remove("show")
         await tab[step].classList.remove("active")
           await console.log(step);
   
         var remove = await document.getElementsByName(step)
         await remove[0].classList.remove("active")
         await remove[0].classList.remove("show")

          tab = await document.getElementsByClassName("fade");
         await console.log(tab)
         await console.log(tab[step]);
         await tab[step+1].classList.add("show")
         await tab[step+1].classList.add("active")
           await console.log(step);
   
         var add = await document.getElementsByName(step+1)
         await add[0].classList.add("active")
         await add[0].classList.add("show")
   

      }
   }

   backHandler = async () => {
      var { step} = this.state
      console.log(step);
      if (step !== 0) { 
         await this.setState({ step: step - 1 })

         var tab = await document.getElementsByClassName("fade");
         await console.log(tab)
         await console.log(tab[step]);
         await tab[step-1].classList.remove("show")
         await tab[step-1].classList.remove("active")
           await console.log(step);
   
         var remove = await document.getElementsByName(step)
         await remove[0].classList.remove("active")
         await remove[0].classList.remove("show")

          tab = await document.getElementsByClassName("fade");
         await console.log(tab)
         await console.log(tab[step]);
         await tab[step-1].classList.add("show")
         await tab[step-1].classList.add("active")
           await console.log(step);
   
         var add = await document.getElementsByName(step-1)
         await add[0].classList.add("active")
         await add[0].classList.add("show")
   

      }
   }

   onRightHandler(keyName,handle) {
      this.nextHandler()
   }

   onLeftHandler(keyName,handle) {
      this.backHandler()
   }
   onhomeHandler(keyName,handle) {
      this.props.history.push("/home")
   }

   render() {
      return (
         <div className="container">
            <div className="row">
            <div className="form col-lg-12">
            <div className="card">
                  <Hotkeys 
                  keyName="right" 
                  onKeyUp={this.onRightHandler.bind(this)}
                  >
                  </Hotkeys>
                  <Hotkeys 
                  keyName="left" 
                  onKeyUp={this.onLeftHandler.bind(this)}
                  >
                  </Hotkeys>
                  <Hotkeys 
                  keyName="ctrl+shift+h" 
                  onKeyUp={this.onhomeHandler.bind(this)}
                  >
                  </Hotkeys>
               <div className="form-title">
                  <h1 className='text-center py-5'>Add Item</h1>
               </div>
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12 nav-wrapper">
                        <nav>
                           <div class="nav nav-tabs nav-spesifikasi" id="nav-tab" role="tablist">
                              <a class="nav-link active" id="nav-spesifikasi-tab" data-toggle="tab" href="#nav-spesifikasi" role="tab" aria-controls="nav-spesifikasi" aria-selected="true" name="0" onClick={this.setStep}>spesifikasi</a>
                              <a class="nav-link nav-satuan" id="nav-satuan-tab" data-toggle="tab" href="#nav-satuan" role="tab" aria-controls="nav-satuan" aria-selected="false" name="1" onClick={this.setStep} >satuan</a>
                              <a class="nav-link" id="nav-stok-tab" data-toggle="tab" href="#nav-stok" role="tab" aria-controls="nav-stok" aria-selected="false" name="2" onClick={this.setStep}>stock</a>
                              <a class="nav-link" id="nav-pajak-tab" data-toggle="tab" href="#nav-pajak" role="tab" aria-controls="nav-pajak" aria-selected="false"
                                 name="3" onClick={this.setStep}>pajak</a>
                              <a class="nav-link" id="nav-jarga-jual-tab" data-toggle="tab" href="#nav-jarga-jual" role="tab" aria-controls="nav-jarga-jual" aria-selected="false"
                                 name="4" onClick={this.setStep}>harga jual</a>
                              <a class="nav-link" name="5" id="nav-akutansi-tab" data-toggle="tab" href="#nav-akutansi" role="tab" aria-controls="nav-akutansi" aria-selected="false"
                                 onClick={this.setStep}>akutansi</a>
                           </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                           <div class="tab-pane fade show active" id="nav-spesifikasi" role="tabpanel" aria-labelledby="nav-spesifikasi-tab">
                              <div className="navItem">
                                 <div className="row">
                                    <div className=" item col-lg-6">
                                       <form>
                                          <InputText
                                             labelInput="kode"
                                             typeInput="text"
                                             idInput="kode"
                                             nameInput="kode"
                                             valueInput=""
                                             labelHtml="kode"
                                          />
                                          <InputText
                                             labelInput="barcode"
                                             typeInput="text"
                                             idInput="barcode"
                                             nameInput="barcode"
                                             valueInput=""
                                             labelHtml="barcode"
                                          />
                                          <InputText
                                             labelInput="name"
                                             typeInput="text"
                                             idInput="name"
                                             nameInput="name"
                                             valueInput=""
                                             labelHtml="name"
                                          />
                                          <SelectInput labelInput="typeinput" nameInput="typeInput" idInput="typeinput" labelHtml="Type Item" itemInput={
                                             [
                                                { id: "jasa", html: "Jasa", value: "" },
                                                { id: "barang-jadi", html: "Barang Jadi", value: "" },
                                                { id: "tenaga-kerja", html: "Biaya Tenaga Kerja", value: "" },
                                             ]}
                                          />
                                          <SelectInput labelInput="merek" nameInput="merek" idInput="merek" labelHtml="Merek" itemInput={
                                             [
                                                { id: "yamaha", html: "Yamaha", value: "" },
                                                { id: "honda", html: "Honda", value: "" },
                                             ]}
                                          />

                                          <div class="form-group">
                                             <label for="exampleFormControlTextarea1">Keterangan</label>
                                             <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                          </div>

                                       </form>
                                    </div>
                                 </div>
                              </div>

                           </div>
                           <div class="tab-pane fade" id="nav-satuan" role="tabpanel" aria-labelledby="nav-satuan-tab">
                              <div className="navItem">
                                 <div className="row">
                                    <div className=" item col-lg-6">
                                       <form>
                                          <div class="form-group shadows">
                                             <label for="kode">kode</label>
                                             <input type="email" class="form-control" id="kode" placeholder="Auto" />
                                          </div>
                                          <div class="form-group ">
                                             <label for="barcode">barcode</label>
                                             <input type="email" class="form-control" id="barcode" />
                                          </div>
                                          <div class="form-group ">
                                             <label for="name">name</label>
                                             <input type="email" class="form-control" id="name" />
                                          </div>
                                          <div class="form-group">
                                             <label for="exampleFormControlSelect1">Type Item</label>
                                             <select class="form-control" id="exampleFormControlSelect1">
                                                <option className="select-item">Jasa</option>
                                                <option className="select-item">Barang Jadi</option>
                                                <option className="select-item">Biaya Tenaga Kerja</option>
                                                <option className="select-item">Item Lain Lain</option>
                                                <option className="select-item">Bahan Baku</option>
                                             </select>
                                          </div>
                                          <div class="form-group">
                                             <label for="exampleFormControlSelect1">Merek</label>
                                             <select class="form-control" id="exampleFormControlSelect1">
                                                <option className="select-item">Yamaha</option>
                                                <option className="select-item">Honda</option>
                                                <option className="select-item">Biaya Tenaga Kerja</option>
                                                <option className="select-item">Item Lain Lain</option>
                                                <option className="select-item">Bahan Baku</option>
                                             </select>
                                          </div>
                                          <div class="form-group">
                                             <label for="exampleFormControlTextarea1">Keterangan</label>
                                             <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                          </div>


                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                           <Progress stepValue={this.stepValue} progress={this.state.step} />


                           {this.state.step === 5 ?
                              <div className="col-lg-12 my-5 submit">
                                 <button type="button" className="btn btn-secondary button-click" onClick={this.nextHandler}><i class="mr-2 fas fa-arrow-left"></i> Camcel</button>
                                 <button type="button" className="btn btn-primary  ml-2 button-click">Save<i class="ml-2 far fa-share-square"></i></button>
                              </div>
                              :
                              <div className="col-lg-12 my-5 submit">
                                 <div className="col-lg-12 my-5 submit">
                                    <button type="button" className="btn btn-secondary button-click" onClick={this.backHandler}><i class="mr-2 fas fa-arrow-left"></i>Back</button>
                                    <button type="button" className="btn btn-primary  ml-2 button-click" onClick={this.nextHandler}>Next<i class="ml-2 fas fa-arrow-right"></i></button>
                                 </div>
                              </div>
                           }


                        </div>
                     </div>
                  </div>
               </div>
            </div>
           </div>
            </div>
      </div>
      );
   }
}

export default withRouter(Form);