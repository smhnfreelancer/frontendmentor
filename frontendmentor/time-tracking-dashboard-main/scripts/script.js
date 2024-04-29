const grid = document.querySelector('.grid');
var dataJson;

async function fetchData() {
  try {
    // Fetch the JSON file
    const response = await fetch('data.json');

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();

    // Now 'data' contains your parsed JSON data
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  }
}

// Call the function to fetch the data
fetchData();

function createBlock(time) {
  const cardBlock = `
<div class="${time.title.toLowerCase().replace(/ /g, '_')}-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px]">
  <div
    class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7"
  >
    <div class="flex flex-row justify-between">
      <span class="text-[18px] font-normal text-white">${time.title}</span>
      <span class="self-center"
        ><img src="./images/icon-ellipsis.svg" alt=""
      /></span>
    </div>
    <div
      class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start"
    >
      <span
        class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]"
        >${time.timeframes.daily.current}${time.timeframes.daily.current ? 'hrs' : ''}</span
      >
      <span
        class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2"
        >Previous - ${time.timeframes.daily.previous}${time.timeframes.daily.previous ? 'hrs' : ''}</span
      >
    </div>
  </div>
</div>
`;
  grid.innerHTML += cardBlock;
}
