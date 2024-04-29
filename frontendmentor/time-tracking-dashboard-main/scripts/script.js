const grid = document.querySelector('.grid');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const cards = document.querySelectorAll('.card');
const LI = document.querySelectorAll('li');

var dataJson;

async function dailyLoading() {
  await removeActiveLink();
  await fetchData();
  await removeCards();
  await createDailyBlock();
}

async function weeklyLoading() {
  await removeActiveLink();
  await fetchData();
  await removeCards();
  await createWeeklyBlock();
}

async function removeActiveLink() {
LI.forEach(li => {
  li.classList.remove('text-white')
})
}

async function removeCards() {
cards.forEach(card => {
  card.remove();
})
}

async function fetchData() {
  const response = await fetch('data.json');

  data = await response.json();
    dataJson = data;
  console.log(dataJson);
}

async function createDailyBlock() {
  daily.classList.add('text-white');
  dataJson.forEach(element => {
  const cardBlock = `
<div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px] card">
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
        >Last day - ${element.timeframes.daily.previous}${element.timeframes.daily.previous ? 'hrs' : ''}</span
      >
    </div>
  </div>
</div>
`;
  grid.innerHTML += cardBlock;
  });
}

async function createWeeklyBlock() {
  weekly.classList.add('text-white');
  dataJson.forEach(element => {
  const cardBlock = `
<div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px] card">
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
        >${element.timeframes.weekly.current}${element.timeframes.weekly.current ? 'hrs' : ''}</span
      >
      <span
        class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2"
        >Last week - ${element.timeframes.weekly.previous}${element.timeframes.weekly.previous ? 'hrs' : ''}</span
      >
    </div>
  </div>
</div>
`;
  grid.innerHTML += cardBlock;
  });
}

daily.addEventListener('click', dailyLoading);
weekly.addEventListener('click', weeklyLoading);
document.addEventListener('DOMContentLoaded',weeklyLoading)