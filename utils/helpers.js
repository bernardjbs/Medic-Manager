// Any functions that will be used inside the views 'handlebars'.
module.exports = {
    format_time: (date) => {
        return date.toDateString();
    },
    format_toIsoStr: (date => {
        return date.toISOString().substring(0,10);
    })
}
  