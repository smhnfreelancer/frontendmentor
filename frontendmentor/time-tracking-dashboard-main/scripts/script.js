// State object to store application state
const state = {
  data: null, // Holds fetched data
  currentTimeframe: 'weekly', // Default timeframe
};

// Fetch data once and store in state
async function fetchData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    state.data = await response.json(); // Store fetched data in state
  } catch (error) {
    console.error('Error fetching data:', error);
    state.data = null;
  }
}

// Remove the active class from all timeframe buttons
function removeActiveLink() {
  const timeframeButtons = document.querySelectorAll('li');
  timeframeButtons.forEach(button => button.classList.remove('text-white'));
}

// Render the cards for the current timeframe
function renderTimeframeCards() {
  const { data, currentTimeframe } = state;

  if (!data) {
    console.error('No data available to render');
    return;
  }

  // Get the subgrid container and clear existing content
  const subgrid = document.querySelector('.grid-cols-subgrid');
  while (subgrid.firstChild) {
    subgrid.removeChild(subgrid.firstChild);
  }

  // Iterate over the data and create cards dynamically
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = `${item.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-11 md:max-w-[255px] card`;

    const cardContent = `
      <div class="hover:bg-cardHover h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 hover:cursor-pointer lg:px-7 lg:py-7">
        <div class="flex flex-row justify-between">
          <span class="text-[18px] font-medium text-white">${item.title}</span>
          <span class="self-center">
            <img src="./images/icon-ellipsis.svg" alt="" />
          </span>
        </div>
        <div class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start">
          <span class="text-[32px] font-light text-white lg:mt-5 lg:text-[56px]">
            ${item.timeframes[currentTimeframe].current || 0}hrs
          </span>
          <span class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2">
            Last ${currentTimeframe === 'daily' ? 'day' : currentTimeframe === 'weekly' ? 'week' : 'month'} - ${item.timeframes[currentTimeframe].previous || 0}hrs
          </span>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;
    subgrid.appendChild(card);
  });
}

// Handle timeframe changes
function handleTimeframeChange(newTimeframe) {
  state.currentTimeframe = newTimeframe; // Update state
  removeActiveLink(); // Remove active state from buttons
  document.getElementById(newTimeframe).classList.add('text-white'); // Highlight the selected button
  renderTimeframeCards(); // Re-render cards
}

// Initialize the application
async function init() {
  const timeframeContainer = document.querySelector('ul'); // Parent container for buttons

  // Event delegation for timeframe buttons
  timeframeContainer.addEventListener('click', event => {
    const clickedElement = event.target;
    const timeframe = clickedElement.id;

    if (timeframe === 'daily' || timeframe === 'weekly' || timeframe === 'monthly') {
      handleTimeframeChange(timeframe);
    }
  });

  // Fetch data and render the default timeframe
  await fetchData();
  if (state.data) {
    handleTimeframeChange(state.currentTimeframe); // Default to 'weekly'
  } else {
    console.error('Failed to load initial data');
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
