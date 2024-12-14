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
function createTimeframeBlock(timeframe) {
  // Remove 'active' state from all links
  removeActiveLink();

  // Add 'active' class to the selected link
  const timeframeElement = document.getElementById(timeframe);
  timeframeElement.classList.add('text-white');

  // Clear existing content
  subgrid.innerHTML = '';

  // Fetch data and create blocks dynamically
  fetchData().then(data => {
    if (data !== null) {
      data.forEach(element => {
        const cardBlock = `
          <div class="${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-11 md:max-w-[255px] card">
            <div class="hover:bg-cardHover h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 hover:cursor-pointer lg:px-7 lg:py-7">
              <div class="flex flex-row justify-between">
                <span class="text-[18px] font-medium text-white">${element.title}</span>
                <span class="self-center">
                  <img src="./images/icon-ellipsis.svg" alt=""/>
                </span>
              </div>
              <div class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start">
                <span class="text-[32px] font-light text-white lg:mt-5 lg:text-[56px]">
                  ${element.timeframes[timeframe].current || 0}hrs
                </span>
                <span class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2">
                  Last ${timeframe === 'daily' ? 'day' : timeframe === 'weekly' ? 'week' : 'month'} - ${element.timeframes[timeframe].previous || 0}hrs
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
  daily.addEventListener('click', () => createTimeframeBlock('daily'));
  weekly.addEventListener('click', () => createTimeframeBlock('weekly'));
  monthly.addEventListener('click', () => createTimeframeBlock('monthly'));
  
  // Default to weekly
  createTimeframeBlock('weekly');
}


document.addEventListener('DOMContentLoaded', init, false);
