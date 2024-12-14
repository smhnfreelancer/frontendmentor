// Global state object
const state = {
  data: null, // Holds fetched data
  currentTimeframe: 'weekly', // Default timeframe
};

// Fetch data once and store it in state
async function fetchData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    state.data = await response.json(); // Store data in state
  } catch (error) {
    console.error('Error fetching data:', error);
    state.data = null;
  }
}

// Render timeframe cards based on state
function renderTimeframeCards() {
  const { currentTimeframe, data } = state;

  if (!data) {
    console.log('No data available to render');
    return;
  }

  // Clear existing content
  const subgrid = document.querySelector('.grid-cols-subgrid');
  while (subgrid.firstChild) {
    subgrid.removeChild(subgrid.firstChild);
  }

  // Create cards for the current timeframe
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
    currentHours.textContent = `${element.timeframes[currentTimeframe].current || 0}hrs`;

    const previousHours = document.createElement('span');
    previousHours.className = 'self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2';
    previousHours.textContent = `Last ${currentTimeframe === 'daily' ? 'day' : currentTimeframe === 'weekly' ? 'week' : 'month'} - ${element.timeframes[currentTimeframe].previous || 0}hrs`;

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
}

// Handle timeframe change
function handleTimeframeChange(newTimeframe) {
  state.currentTimeframe = newTimeframe; // Update state
  renderTimeframeCards(); // Re-render cards
}

// Initialize the app
async function init() {
  const timeframeContainer = document.querySelector('ul'); // Parent container for timeframe buttons

  // Event delegation for timeframe clicks
  timeframeContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const timeframe = clickedElement.dataset.timeframe; // Read timeframe from data attribute

    if (timeframe) {
      // Highlight active link
      document.querySelectorAll('li').forEach(li => li.classList.remove('text-white'));
      clickedElement.classList.add('text-white');

      handleTimeframeChange(timeframe); // Update and render
    }
  });

  // Fetch data and render default timeframe
  await fetchData();
  if (state.data) {
    handleTimeframeChange(state.currentTimeframe);
  }
}

document.addEventListener('DOMContentLoaded', init);
