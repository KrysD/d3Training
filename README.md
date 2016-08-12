# D3 library training

## Quick setup
Data are provided. The data set gives the measurements in centimeters of the variables sepal length and width and petal length and width respectively for 50 flowers from each of 3 species of iris (_setosa_, _versicolor_ and _virginica_).  
*Source :*  
- Fisher, R. A. (1936) The use of multiple measurements in taxonomic problems. _Annals of Eugenics_, 7, Part II, 179–188.  
- The data were collected by Anderson, Edgar (1935). The irises of the Gaspe Peninsula, _Bulletin of the American Iris Society_, 59, 2–5.  

```
npm install
npm run build
```

## For dev

```
npm run watch
```
## To Do

- [X] Create two different chart to test [crossfilter](https://github.com/square/crossfilter/wiki/API-Reference) 
- [X] Update value depending on [d3-brush](https://github.com/d3/d3-brush)
- [ ] Enhance chart
- [X] Add the categorical axes chart
- [X] Filter and update chart depending on `.on("click",...)` event
- [ ] Create a chart by variable
- [X] Create histogram for numeric variables
- [X] Create barplot for categorical variables
- [ ] Create function to generate charts(`Barchart()` and `HistChart()`)
- [X] Change color brush inside rect or make ordinal scale 