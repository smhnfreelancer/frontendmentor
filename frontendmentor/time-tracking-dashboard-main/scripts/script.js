const grid = document.querySelector('.grid');
let dataJson;

// Fetch the JSON file
fetch('data.json')
  .then(response => {
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Now 'data' contains your parsed JSON data
    dataJson = data;
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

// console.log(dataJson[0].timeframes.daily.current);

const cardBlock = `
<div class="work-card max-w-[327px] rounded-b-[20px] rounded-t-[15px] pt-10 md:max-w-[255px]">
  <div
    class="h-full rounded-[15px] rounded-b-[13px] bg-DarkBlue px-6 py-9 lg:px-7 lg:py-7"
  >
    <div class="flex flex-row justify-between">
      <span class="text-[18px] font-normal text-white">Work</span>
      <span class="self-center"
        ><img src="./images/icon-ellipsis.svg" alt=""
      /></span>
    </div>
    <div
      class="mt-2 flex flex-row flex-wrap justify-between md:flex-col md:justify-start"
    >
      <span
        class="text-[32px] font-light text-white lg:mt-6 lg:text-[56px]"
        >${dataJson[0].timeframes.daily.current}hrs</span
      >
      <span
        class="self-center text-[15px] font-normal text-PaleBlue md:self-start lg:mt-2"
        >Previous - 7hrs</span
      >
    </div>
  </div>
</div>
`;

grid.innerHTML += cardBlock;
