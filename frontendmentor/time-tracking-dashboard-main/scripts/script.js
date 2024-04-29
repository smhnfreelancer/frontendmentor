const grid = document.querySelector('.grid');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
var dataJson;

async function dailyLoading() {
  await daily.classList.add('text-white');
  await fetchData();
  await createBlock();
}

async function fetchData() {
  const response = await fetch('data.json');

  data = await response.json();
  dataJson = data;
  console.log(dataJson);
}

function createBlock() {
  dataJson.forEach(element => {
    const cardBlock = `
<div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px]">
  <div
    class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7"
  >
    <div class="flex flex-row justify-between">
      <span class="text-[18px] font-normal text-white">${element.title}</span>
      <span class="self-center"
        ><img src="./images/icon-ellipsis.svg" alt=""
      /></span>
    </div>
    <div
      class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start"
    >
      <span
        class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]"
        >${element.timeframes.daily.current}${element.timeframes.daily.current ? 'hrs' : ''}</span
      >
      <span
        class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2"
        >Previous - ${element.timeframes.daily.previous}${element.timeframes.daily.previous ? 'hrs' : ''}</span
      >
    </div>
  </div>
</div>
`;
    grid.innerHTML += cardBlock;
  });
}

daily.addEventListener('click', dailyLoading);
