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

async function fetchData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function createTimeframeBlock(timeframe) {
  removeActiveLink();

  const timeframeElement = document.getElementById(timeframe);
  timeframeElement.classList.add('text-white');

  // Clear existing content
  while (subgrid.firstChild) {
    subgrid.removeChild(subgrid.firstChild);
  }

  const data = await fetchData();
  if (data) {
    data.forEach(element => {
      // Create card container
      const card = document.createElement('div');
      card.className = `${element.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-11 md:max-w-[255px] card`;

      // Create card content
      const cardContent = document.createElement('div');
      cardContent.className = 'hover:bg-cardHover h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 hover:cursor-pointer lg:px-7 lg:py-7';

      // Title row
      const titleRow = document.createElement('div');
      titleRow.className = 'flex flex-row justify-between';
      const title = document.createElement('span');
      title.className = 'text-[18px] font-medium text-white';
      title.textContent = element.title;
      const icon = document.createElement('span');
      icon.className = 'self-center';
      const iconImg = document.createElement('img');
      iconImg.src = './images/icon-ellipsis.svg';
      iconImg.alt = '';
      icon.appendChild(iconImg);

      titleRow.appendChild(title);
      titleRow.appendChild(icon);

      // Timeframe data
      const timeData = document.createElement('div');
      timeData.className = 'mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start';

      const currentHours = document.createElement('span');
      currentHours.className = 'text-[32px] font-light text-white lg:mt-5 lg:text-[56px]';
      currentHours.textContent = `${element.timeframes[timeframe].current || 0}hrs`;

      const previousHours = document.createElement('span');
      previousHours.className = 'self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2';
      previousHours.textContent = `Last ${timeframe === 'daily' ? 'day' : timeframe === 'weekly' ? 'week' : 'month'} - ${element.timeframes[timeframe].previous || 0}hrs`;

      timeData.appendChild(currentHours);
      timeData.appendChild(previousHours);

      // Assemble card content
      cardContent.appendChild(titleRow);
      cardContent.appendChild(timeData);

      // Assemble card
      card.appendChild(cardContent);

      // Append to subgrid
      subgrid.appendChild(card);
    });
  } else {
    console.log('Data could not be fetched');
  }
}




function init() {
  const timeframeContainer = document.querySelector('ul'); // Parent of the timeframe buttons

  timeframeContainer.addEventListener('click', async (event) => {
    const clickedElement = event.target;
  
    // Check if a valid timeframe button was clicked
    const timeframe = clickedElement.dataset.timeframe;
    if (timeframe) {
      try {
        await createTimeframeBlock(timeframe);
      } catch (error) {
        console.error(`Error loading ${timeframe} data:`, error);
      }
    }
  });
  

  // Default load
  (async () => {
    try {
      await createTimeframeBlock('weekly');
    } catch (error) {
      console.error('Error loading default data:', error);
    }
  })();
}

document.addEventListener('DOMContentLoaded', init, false);
