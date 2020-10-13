// export function getWeekFromToday(today) {
//   return today
// }
import Moment from 'moment'
const common = {
  Days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  Months:["January","February","March","April","May","June","July","August","September","October","November","December"],
  getWeekFromToday(today) {
    //get Day from today: [Sunday ..... Saturday]
    let day = new Date(today).getDay()
    let week = []
    for(let i = 0; i < 7 ; i++ ) {
      week.push(this.nDayFromNow(today, i-day))
    }
    return week
  },
  nDayFromNow(currentDay,n){
    return Moment( (new Date(currentDay)).getTime() + 24*60*60*1000*n ).format("YYYY-MM-DD")
  },
  getDayDiff(bgnDay,endDay){
    let bgn = (new Date(bgnDay)).getTime(),
        end = (new Date(endDay)).getTime(),
        diff = (end - bgn)/1000/60/60/24;
    return diff

  },
  //get startDate and endDate of this month; return [ startDate, endDate]
  getDateRangeOfMonth(year,month) {
    let Day31  = [1,3,5,7,8,10,12],
        Day30  = [4,6,9,11],
        DayFeb = [2],
        lastDate,
        startDate = year + "-" + this.addZero(month + 1) + "-" + "01",
        endDate   = "",
        rangeList = [];      
    if( Day31.indexOf(month + 1) !=-1) {
      lastDate = 31
      endDate = year + "-" + this.addZero(month + 1) + "-" + lastDate;
      
    }
    if( Day30.indexOf(month + 1) !=-1) {
      lastDate = 30;
      endDate = year + "-" + this.addZero(month + 1) + "-" + lastDate;
      
    }
    if( DayFeb.indexOf(month + 1) !=-1) {
      if( year%4 == 0 ){
        lastDate = 29
      }else{
        lastDate = 28
      }
      endDate = year + "-" + this.addZero(month + 1) + "-" + lastDate;
      
    }

    for(let i = 0; i < lastDate; i++){
      rangeList.push( this.nDayFromNow(startDate,i) )
    }

    return {
      range:[startDate,endDate],
      rangeList,
      count:lastDate,
    }
  },
  // add zero for months num less than 10
  addZero(value){
    if(value < 10){
      return "0" + value;
    }
    else{
      return value + ""
    }
  },
  computeScore(_new, _review){
    let count = 0,
    tot;
    if ( _new.length > 0 || _review.length > 0 ) {
      tot = _new.length + _review.length;
      _new.forEach((element) => {
        if (element.finished) {
          count++;
        }
      });
      _review.forEach((element) => {
        if (element.finished) {
          count++;
        }
      });
      return parseInt((count / tot) * 100);
    }
    return 0;
  }
}

export default common