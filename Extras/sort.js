


function SortByWinRate(content)
{

    console.log(selectSort(content));

    return selectSort(content);
}


module.exports = {SortByWinRate};


function selectSort(content)
{
    let min;

    for(let i = 0; i < content.length; i++)
    {
        min = i;

        for(let j = i + 1; j < content.length; j++)
        {
            if(content[j][4] > content[min][4]){
                min = j
            }
        }

        if (min !== i)
        {
            [content[i], content[min]] = [content[min], content[i]];
        }
    }

    return content;
}