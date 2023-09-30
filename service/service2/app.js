const formatDate = (date, format) => {


  return (format || 'YYYY-MM-DD hh:mm:ss').replace(/YYYY/g, date.getFullYear())
    .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/DD/g, ('0' + date.getDate()).slice(-2))
    .replace(/hh/g, ('0' + date.getHours()).slice(-2))

    .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
}

const main = () => {
  console.log({ result: formatDate(new Date()), debug: true })
}

main()

