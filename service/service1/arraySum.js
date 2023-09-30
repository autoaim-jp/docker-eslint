
const arraySum = (arr) => {
  return arr.reduce((acc, cur) => { return acc + cur }, 0)
}

const main = () => {
  const arr = [1, 2, 3, 4, ]

  const sum = arraySum(arr)
  console.log(sum)
}

main()

