<template>
<div>
    <c-toolbar/>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-card class="mx-auto elevation-11 py-4 px-2">
              <v-row justify="center">
                <v-img src="img/Indomaret.png" aspect-ratio="3" max-width="300" position="end"></v-img>
                <!-- <v-col cols="4">
                </v-col>-->
              </v-row>

              <h2 class="text-center my-4">Form Data Diri Tamu Indomaret Group.</h2>
              <h5 class="text-center my-4"> Version 1.1.3 </h5>

              <v-alert class="mx-2" type="info">
                
                <div>
                Sebagai bentuk dukungan kami untuk memutus mata rantai penularan Corona Virus Disease 2019 (COVID-19). 
                </div>
                <div>Kami mohon bantuan Bapak/Ibu yang akan bertamu ke Indomaret group (HO Kemayoran/Ancol/Menara PIK) untuk mengisi data diri dan menjawab pertanyaan - pertanyaan yang kami berikan.
                    
                </div>
              </v-alert>


              <v-form class="pa-4" v-model="valid">
                <div class="my-2">
                  <v-row >
                    <v-col cols="12" sm="6">
                      <div>
                        <v-text-field
                          v-model="name"
                          v-on:keypress="isLetter($event)"
                          :rules="[() => !!name || 'This field is required']"
                          :error-messages="nameErrors"
                          label="Nama"
                          required
                          
                        ></v-text-field>
                      </div>
                    </v-col>
                  

                  
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="noktp"
                        
                        v-on:keypress="isNumber($event)"
                        :rules="[() => !!noktp || 'This field is required',
                        () => !!noktp && noktp.length >= 16 || 'Harus 16 Karakter',
                        () => !!noktp && noktp.length <17 || 'Tidak Boleh Lebih 16 Karakter']"
                        label="No.KTP"
                        required
                        counter="16"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="phoneNumber"
                        :rules="[() => !!phoneNumber || 'This field is required']"
                        label="No.Handphone"
                        required
                        v-on:keypress="isNumber($event)"
                      
                      ></v-text-field>
                    </v-col>

                    <!-- {
                        required: true,
                        digits: 7,
                        regex: '^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|30|31|71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
                        } -->
                  
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="nama_perusahaan"
                        type="text"
                        :rules="[() => !!nama_perusahaan || 'This field is required']"
                        :error-messages="nameErrors"
                        label="Nama Perusahaan"
                        required
                        
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-card-text >
                      <h2
                        class="subtitle-1 font-weight-regular text-justify"
                      >Tujuan (Kantor Pusat Indomaret Group)</h2>
                      <v-radio-group v-model="tujuanTamu" 
                      >
                        <v-radio
                          v-for="item in itemLokasiKantor"
                          :key="item.id"
                          :label="`${item.name}`"
                          :value="item.id"
                        ></v-radio>
                      </v-radio-group>
                      
                    </v-card-text>

                    <v-col cols="12" sm="6">
                      <div>
                        <v-text-field
                          v-model="nama_karyawan"
                          type="text"
                          :rules="[() => !!nama_karyawan || 'This field is required']"
                          :error-messages="nameErrors"
                          v-on:keypress="isLetter($event)"
                          label="Nama Karyawan Yang Di Temui"
                          required
                      
                        ></v-text-field>
                      </div>
                    </v-col>

                    <v-col cols="12" sm="6">
                <v-autocomplete
                v-model="unitData"
                :items="unit"
                :loading="isLoading"
                color="white"
                :rules="[() => !!unitData || 'This field is required']"
                hide-selected
                item-text="NAMA_PT"
                item-value="NAMA_PT"
                label="Pilih Unit/PT"
                placeholder="Silahkan ketik untuk mencari..."
                
                @change="getDepartment"
                > Unit/PT Karyawan yang Akan Ditemui </v-autocomplete>
                <h5 class="red--text">* Jika Tidak Tahu, Silahkan Tanya Karyawan Yang Dituju</h5>
              </v-col>

              <v-col cols="12" sm="6" >
                <v-autocomplete
                  v-model="department"
                  :items="departments"
                  :loading="isLoading"
                  color="white"
                  :rules="[() => !!department || 'This field is required']"
                  hide-selected
                  item-text="BAGIAN"
                  item-value="BAGIAN"
                  label="Pilih Departemen"
                  placeholder="Silahkan ketik untuk mencari..."
                  
                  return-object
                  
                > Departemen/Bagian Karyawan yang Akan Ditemui </v-autocomplete>
                <h5 class="red--text">* Jika Tidak Tahu, Silahkan Tanya Karyawan Yang Dituju</h5>

              </v-col>

              <v-col cols="12" sm="6">

                      <v-text-field
                        v-model.number="jmltamu"
                        :rules="numberRules"
                        label="Jumlah Orang Dari Perusahaan yang Akan Hadir"
                        required
                        v-on:keypress="isNumber($event)"
                      ></v-text-field>
                      <h5 class="red--text">Note: Semua Tamu Yang Akan Hadir Wajib Isi Self Assesment Tamu</h5>
                    </v-col>

                    <v-col
        cols="12"
        sm="6"
      >
        <v-menu
          ref="menu1"
          v-model="date1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="tanggalAwal"
              label="Tanggal Mulai Bertemu"
              hint="DD/MM/YYYY format"
              persistent-hint
              :rules="[() => !!tanggalAwal || 'This field is required']"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.month"
            :min="new Date().toISOString().substr(0,10)"
            no-title
            @input="date1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>



      <v-col
      cols="12"
      sm="6"
    >
      <v-container class="subtitle-1 font-weight-regular text-justify" style="max-width: 300px;">
      <v-digital-time-picker
        v-model="startTime"
        label="Waktu Mulai Berkunjung"
        rounded
        filled/>
    </v-container>
    </v-col>

    <!-- <v-col
        cols="12"
        sm="6"
      >
        <v-menu
          ref="menu2"
          v-model="date2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="tanggalAkhir"
              label="Tanggal Selesai Bertemu "
              hint="DD/MM/YYYY format"
              persistent-hint
              :rules="[() => !!tanggalAkhir || 'This field is required']"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.day"
            no-title
            @input="date2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col> -->

      <v-col
      cols="12"
      sm="6"
    >
      <v-container style="max-width: 300px;">
      <v-digital-time-picker
        v-model="endTime"
        label="Waktu Selesai Berkunjung"
        rounded
        filled/>
    </v-container>
      
    </v-col>

    <v-col cols="12" sm="6">
    <v-text-field
    v-model="keterangan"
    auto-grow
    type="text"
    rows="1"
    :rules="[() => !!keterangan || 'This box is required']"
    label="Maksud/Tujuan Berkunjung">
    </v-text-field>
    </v-col>

  </v-row>
    

    <v-row justify="center" dense>
    <v-btn @click="submitDataTamu" color="primary" large  :disabled="!valid || this.tujuanTamu == ''" >Submit</v-btn>
      </v-row>

                </div>
              </v-form>
              
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</div>
</template>

<script>

import './form.css'

export default {
    name: "Form-Tamu",
  components: {
    CToolbar,
    
  },

    mixins: [validationMixin],

    validations: {
        name:{ required },
        noktp:{ required },
        phoneNumber:{ required },
        nama_perusahaan:{ required },
        nama_karyawan: { required },
        tujuanTamu:{ required },
        unit:{ required },
        bagian:{ required },
        jmltamu:{ required },
        startDate:{ required },
        endDate:{ required },
        startTime:{ required },
        endTime:{ required },
        keterangan:{ required },

     },

    //!Get Today Date Format yyyy-mm-dd
    //  new Date().toISOString().substr(0,10)
    //!Get Today Date Format dd/mm/yyyy
    //  new Date().toLocaleDateString()

    data() {

        
        return {

          numberRules: [
    v => Number.isInteger(v) || 'Numbers Only Input',
    v => v >= 0 || 'The value must be greater than zero'
  ],

          formData: {
        month: [],
        day: []
      },

            
            name:"",
            noktp:"",
            phoneNumber:[],
            nama_perusahaan:"",
            nama_karyawan: "",
            tujuanTamu:"",
            unit:[],
            bagian:"",
            jmltamu:"",
            startDate:"",
            sysDate: new Date().toLocaleDateString(),
            todayDate:"",
            startTime:'',
            endTime:"",
            keterangan:"",
            dateFormatted1:"",
            dateFormatted2:"",
            unitData:[],
            date1:"",
            date2:"",
            departments:[],
            department:[],

            isLoading:false,


            itemLokasiKantor: [
      {
        id: "HOANCOL",
        name: "Kantor Pusat Indomaret Ancol"
      },
      {
        id: "HOKEMAYORAN",
        name: "Kantor Pusat Indomaret Kemayoran"
      },
      {
        id: "HOPIK",
        name: "Kantor Pusat Indomaret Menara PIK"
      }
    ],




        }
    },

    computed:{

      ...mapGetters({
        getKTP: "ktp"
      }),

      ktp:{
        get(){
          return this.getKTP
        },

        set(val){
          this.setKTP(val)
        }

      },


        phoneNumberErrors() {
      const errors = [];
      if (!this.phoneNumber.$dirty) return errors;
      !this.phoneNumber.required &&
        errors.push("Nomor Harus Di isi");
      !this.phoneNumber;
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.name.$dirty) return errors;
      !this.name.required && errors.push("Harus Di isi.");
      return errors;
    },
    nikErrors() {
      const errors = [];
      if (!this.noktp.$dirty) return errors;
      !this.noktp.required && errors.push("Harus Di isi");
      
      return errors;
    },

    tanggalAwal(){
      if(this.formData.month == ""){
        return ""
      }else{
      let startDate = this.testReformatDate(new Date(this.formData.month));
      return startDate
      }
    },


    //! Nemtuin Allowed Date
    // :min="new Date().toISOString().substr(0, 10)"
    // :max="new Date(Date.now()+(120*24*60*60*1000)).toISOString().substr(0, 10)"

    // tanggalAkhir(){
    //   if(this.formData.day == ""){
    //     return ""
    //   }else{
    //   let endDate = this.testReformatDate(new Date(this.formData.day));
    //   return endDate
    //   }
    // },


    },

    mounted(){
      this.getUnit()
      // this.reload()
      
    },



    methods: {

      ...mapActions({
        setKTP:"setKTP"
      }),

  
        
      testReformatDate(val) {
      let tempDate = new Date(val);
      return `${tempDate.getDate()}-${
        tempDate.getMonth() + 1
      }-${tempDate.getFullYear()}`;
    },


  //! Limiting Input
    isLetter(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if(/^[A-Za-z ]+$/.test(char)) return true; // Match with regex 
  else e.preventDefault(); // If not match, don't add to input text
},

isNumber(n) {
  let char = String.fromCharCode(n.keyCode); // Get the character
  if(/^[0-9]+$/.test(char)) return true; // Match with regex 
  else n.preventDefault(); // If not match, don't add to input text
},

    reload(){
      setTimeout(()=>
        window.location.reload(),
        1000
      )
    

    },


    getUnit(){
      axios
            .post({
              nik: null,
              lokasi : null
              
            })
            .then((response) => {
                this.unit = response.data

            })
            .catch((error) => {
                alert("Tidak Dapat Mengambil Unit")
            })
    },

    getDepartment() {
      axios.post( {
        nik: null,
        lokasi: null,
        // direktorat:null,
        pt: this.unitData
      })
        .then((response) => {
          this.departments = response.data;
          // this.departments.unshift(this.itemDepartment.id);
          // console.log(this.departments);
          // this.dept.departments = this.departments;
        })
        .catch((errors) => {
          alert("Departemen Tidak dapat di ambil");
        });
    },

      submitDataTamu(){
        axios.post({
        namalengkap : this.name ,
        noktp : this.noktp ,
        notelp : this.phoneNumber,
        namaperusahaan : this.nama_perusahaan,
        jmloranghadir : this.jmltamu,
        tujuankantorpusat : this.tujuanTamu,
        tujuannamakaryawan : this.nama_karyawan,
        tujuanpt : this.unitData ,
        tujuandepartemen : this.department.BAGIAN,
        tujuanbertamu : this.keterangan,
        tanggalbertamu : this.formData.month,
        waktubertamu : this.startTime,
        tanggalselesai : "",
        waktuselesai : this.endTime,

        })

        .then((response) => {
            console.log(response);
            let res = response.data.data[0]
            console.log(this.formData.month);
            this.$swal({
              title:"Berhasil!",
              icon: "success",
              text: "Terimakasih Data Diri Anda Sudah Tercatat, Silakan Melanjutkan Proses Pengisian Self Assesment Ini"
            })
            this.setKTP(this.noktp)
            

            this.$router.push({ name: "Assessment-Tamu" });
        })
        .catch((error)=>{
            console.log(error);
            this.$swal({
              title:"Gagal",
              icon:"error",
              text:"Mohon Maaf Silahkan Di coba Kembali"
            })
        })
      }

    
    },
}
</script>