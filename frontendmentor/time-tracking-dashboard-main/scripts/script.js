const grid = document.querySelector('.grid');
const subgrid = document.querySelector('.grid-cols-subgrid');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const LI = document.querySelectorAll('li');

var dataJson;

function dailyLoading() {
  removeActiveLink();
  createDailyBlock();
}

function weeklyLoading() {
  removeActiveLink();
  createWeeklyBlock();
}

function monthlyLoading() {
  removeActiveLink();
  createMonthlyBlock();
}

function removeActiveLink() {
  LI.forEach(li => {
    li.classList.remove('text-white');
  });
}

function fetchData() {
  return (
    fetch('./data.json')
      .then(response => {
        return response.json();
      })
      // .then(data => {
      //   // 'data' now contains your parsed JSON
      //   dataJson = data;
      // })
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      })
  );
}

function createDailyBlock() {
  daily.classList.add('text-white');
  subgrid.innerHTML = '';
  fetchData().then(data => {
    if (data !== null) {
      data.forEach(element => {
        const cardBlock = `
                <div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px] card">
                  <div class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7">
                    <div class="flex flex-row justify-between">
                      <span class="text-[18px] font-normal text-white">${element.title}</span>
                      <span class="self-center">
                        <img src="./images/icon-ellipsis.svg" alt=""/>
                      </span>
                    </div>
                    <div class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start">
                      <span class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]" >
                      ${element.timeframes.daily.current}${element.timeframes.daily.current ? 'hrs' : ''}
                      </span>
                      <span class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2">
                        Last day - ${element.timeframes.daily.previous}${element.timeframes.daily.previous ? 'hrs' : ''}
                        </span>
                    </div>
                  </div>
                </div>
`;
        subgrid.innerHTML += cardBlock;
      });
    } else {
      console.log('Data could not be fetched');
    }
  });
}

function createWeeklyBlock() {
  weekly.classList.add('text-white');
  subgrid.innerHTML = '';
  fetchData().then(data => {
    if (data !== null) {
      data.forEach(element => {
        const cardBlock = `
                <div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px] card">
                  <div class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7">
                    <div class="flex flex-row justify-between">
                      <span class="text-[18px] font-normal text-white">
                        ${element.title}
                      </span>
                      <span class="self-center">
                        <img src="./images/icon-ellipsis.svg" alt=""/>
                      </span>
                    </div>
                    <div class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start">
                      <span class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]">
                        ${element.timeframes.weekly.current}${element.timeframes.weekly.current ? 'hrs' : ''}
                      </span>
                      <span class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2">
                        Last week - ${element.timeframes.weekly.previous}${element.timeframes.weekly.previous ? 'hrs' : ''}
                      </span>
                    </div>
                  </div>
                </div>
`;
        subgrid.innerHTML += cardBlock;
      });
    } else {
      console.log('Data could not be fetched');
    }
  });
}

function createMonthlyBlock() {
  monthly.classList.add('text-white');
  subgrid.innerHTML = '';
  fetchData().then(data => {
    if (data !== null) {
      data.forEach(element => {
        const cardBlock = `
                <div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px] card">
                  <div class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7">
                    <div class="flex flex-row justify-between">
                      <span class="text-[18px] font-normal text-white">
                        ${element.title}
                      </span>
                      <span class="self-center">
                        <img src="./images/icon-ellipsis.svg" alt=""/>
                      </span>
                    </div>
                    <div class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start">
                      <span class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]">
                        ${element.timeframes.monthly.current}${element.timeframes.monthly.current ? 'hrs' : ''}
                      </span>
                      <span class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2">
                        Last month - ${element.timeframes.monthly.previous}${element.timeframes.monthly.previous ? 'hrs' : ''}
                      </span>
                    </div>
                  </div>
                </div>
`;
        subgrid.innerHTML += cardBlock;
      });
    } else {
      console.log('Data could not be fetched');
    }
  });
}

function init() {
  daily.addEventListener('click', dailyLoading);
  weekly.addEventListener('click', weeklyLoading);
  monthly.addEventListener('click', monthlyLoading);
  dailyLoading();
}

document.addEventListener('DOMContentLoaded', init, false);
