function menu3(){
    let dt=new Date();
    //curent date
    let date=("0" + dt.getDate()).slice(-2);

    //curent month
    let month = ("0" + (dt.getMonth() + 1)).slice(-2);

    //curent year
    let year=dt.getFullYear();

    //curent hours
    let hours=dt.getHours();

    //curent Minutes
    let Minutes=dt.getMinutes();

    //curent seconds
    let seconds=dt.getSeconds();

    var output=year + "-" + month + "-" + hours + ":" + Minutes + ":" + seconds;
    return output;
}
module.exports=(datetime)