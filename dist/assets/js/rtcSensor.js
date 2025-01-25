class Sensor {
    constructor(name, id) {
      this.name = name;
      this.data = [];
      this.lastupdate = 0;
      this.id = id
    }
    get_all_data() {
        return this.data;
    }
    get_most_recent() {
        if(this.data){
            return data[this.data.length-1];
        }
        return NaN;
    }
}
