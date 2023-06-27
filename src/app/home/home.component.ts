import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //dummy data
  inputData = [
    { colName: 'OrderDate', conditionName: 'equal to', dataType: 'Number' },
    { colName: 'Region', conditionName: 'greater than', dataType: 'String' },
    { colName: 'Rep', conditionName: 'less than', dataType: 'Boolean' },
    { colName: 'Item', conditionName: 'less than or equal to', dataType: 'list' },
    { colName: 'Units', conditionName: 'greater than or equal to', dataType: 'touple' },
    { colName: 'Unit_Cost', conditionName: 'not equal to', dataType: '1-50' },
  ]

  //for adding the subrules initially
  colName: String | undefined;
  conditionName: String = '';
  dataType: any = '';
  value: any = '';
  editable = false;
  currentRowEdit: Number | undefined;
  isAny = false;
  isAll = false;
  isAnyOrAll: String = ''
  countOfFilters: any = [];
  datascount = [1];
  conditionArr: any = [];
  inputType: any = [];
  filters: any = [];
  filterName = '';
  selectedFilterName = false;

  //for adding the rules to a single rule
  count: any = 1;
  savedFilters: any = [];
  filterAsString = "";

  @ViewChild('val') val: any;
  @ViewChild('condition') condition: any;

  constructor(private formBuilder: FormBuilder) {

  }

  //to change the name of the filter
  selectedName() {

    if (this.filterName == '') {
      alert("Please enter a valid name!");
    }
    else {
      this.selectedFilterName = true;
    }
  }

  //to add a new row and add values to filters initially
  addRow(colname: String, conditionname: String, value: String, index: Number) {
    if (this.colName !== '' && this.conditionName !== '' && this.dataType !== '' && this.value !== '') {
      this.datascount.push(this.datascount.length + 1);
      this.filters.push({ id: index, colName: this.colName, conditionName: this.conditionName, value: this.value, filtername: this.filterName, dataType: this.dataType, anyOrAll: this.isAll ? 'any' : 'all' });
      this.colName = '';
      this.conditionName = '';
      this.dataType = '';
      this.value = '';
      console.log(this.filters);
    } else {
      alert('Please fill the valid data');
    }
  }

  //to delete subrules from filter array
  clearRow(index: any) {
    if (this.datascount.length > 1) {
      this.datascount.splice(index, 1);
      this.filters.splice(index, 1);
    }
  }

  //to check whether the subrule is added to the filter array or not
  added(index: Number) {
    const add = this.filters.find((obj: any) => {
      return obj.id === index;
    });
    return add;
  }

  //to check which row/subrule the user is editing
  onEdit(index: Number) {
    this.currentRowEdit = index;
  }

  // inputDate(index: number) {
  //   const isIndex = this.filters.find((obj: any) => {
  //     return obj.id === index;
  //   });
  //   if (this.inputType[index] == "Date" && isIndex) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  onEdited(index: number) {
    if (this.currentRowEdit == index) {
      return true;
    }
    else {
      return false;
    }
  }

  onEditedRow(index: Number) {
    if (this.currentRowEdit == index) {
      return true
    }
    else {
      return false;
    }
  }

  //to update the subrule inside filters array
  updateRow(index: number) {
    if (this.currentRowEdit == index) {
      this.editable = false;
      this.currentRowEdit = undefined;
    }

    this.filters[index].colName = this.colName;
    this.filters[index].conditionName = this.conditionName;
    this.filters[index].dataType = this.dataType;
    this.filters[index].value = this.value;

    console.log(this.filters);
  }

  //to check the match condition
  onSelectAnyOrAll(event: any) {
    if (event == 'any') {
      this.isAny = true;
    }

    else {
      this.isAll = true;
    }
  }

  submit() {

  }



  confirm() {
    alert("After submitting you can't change the filter!");

  }

  //changing the condition and datatype based on the given column name/input data
  onChangeColName(name: String, index: number) {

    this.colName = name;

    if (this.colName == "OrderDate" || this.colName == "Units" || this.colName == "Unit_Cost") {
      this.conditionArr[index] = ["==", "!=", "<=", ">=", "<", ">"];
      this.inputType[index] = this.colName == "OrderDate" ? "Date" : "Number";
    }

    if (this.colName == "Region" || this.colName == "Rep" || this.colName == "Item") {
      this.conditionArr[index] = ["Like", "Not Like", "==", "!="];
      this.inputType[index] = "String";
    }

  }

  onChangeCondition(name: String) {
    this.conditionName = name;

  }

  onChangeValue(name: String) {
    this.value = name;
  }

  onChangeDatatype(name: any) {

    this.dataType = name;
  }

  //to add the list of subrules to a single rule in a python readable format
  onAddRule(val: any) {
    if (this.filters.length == 0) {
      alert("Please add rules!");
    } else {

      let filterAsString = "";

      let operator = "|";
      if (this.isAll) {
        operator = "&";
      }
      for (let filter of this.filters) {
        let eleAsString = " ( "
        eleAsString += filter.colName;

        eleAsString += " " + filter.conditionName + " ";

        eleAsString += filter.value + " ) ";
        filterAsString += eleAsString + " ";
        if (filter !== this.filters[this.filters.length - 1]) {
          filterAsString += operator;
        }
      }

      this.savedFilters.push({ count: this.count, rule: filterAsString, filter: this.filters });
      console.log("savedfilter filter", this.savedFilters.filter);
      this.count += 1;
      filterAsString = '';
      this.isAll = false;
      this.isAny = false;

    }
    this.onReset(val);
  }

  addNewSubrule() {
    this.newFilters.push({ colName: 'Select Input...', dataType: 'Select Input Type...', conditionName: 'Select Condition...', value: '' });
  }

  formSubmit(val: any) {

  }

  onReset(val: any) {
    console.log("val in reset", val);

    val.reset();
    this.filterName = '';
    this.selectedFilterName = false;
    this.editable = false;
    this.currentRowEdit = undefined;
    this.datascount = [1];
    this.filters = [];
    this.inputType = [];
    this.conditionArr = [];
    this.isAll = false;
    this.isAny = false;


  }


  //to edit the existed rules using the pop up window
  displayStyle = "none";
  newFilters: any = [];
  ruleName: any = '';
  currentCount: any;

  openPopup(count: any) {
    this.displayStyle = "block";
    this.currentCount = count;
    this.savedFilters.find((obj: any) => {
      if (obj.count === count) {
        this.newFilters = this.savedFilters[count - 1].filter;
        this.ruleName = this.newFilters.filtername;
        console.log("new filters", this.newFilters);
      }
    });
    console.log("Saved Filters", this.savedFilters);
    console.log("New Filters", this.newFilters);

  }

  closePopup() {
    this.newFilters = [];
    this.displayStyle = "none";
  }

  onDeleteList(index: number) {
    this.savedFilters.splice(index - 1, 1);
  }

  onUpdateRow(index: number) {

    this.newFilters[index].colName = this.colName ? this.colName : this.newFilters[index].colName;
    this.newFilters[index].dataType = this.dataType ? this.dataType : this.newFilters[index].dataType;
    this.newFilters[index].conditionName = this.conditionName ? this.conditionName : this.newFilters[index].conditionName;
    this.newFilters[index].value = this.value ? this.value : this.newFilters[index].value;
    console.log(this.newFilters[index]);

  }

  onDeleteRow(index: number) {
    this.newFilters.splice(index, 1);
  }

  updateList = false;

  updateListOfFilters() {
    this.updateList = true;

    if (this.newFilters.length !== 0) {
      this.savedFilters.find((obj: any) => {
        if (obj.count === this.currentCount) {

          let filterAsString = "";

          let operator = "|";
          if (this.isAll) {
            operator = "&";
          }
          for (let filter of this.newFilters) {
            let eleAsString = " ( "
            eleAsString += filter.colName;

            eleAsString += " " + filter.conditionName + " ";

            eleAsString += filter.value + " ) ";
            filterAsString += eleAsString + " ";
            if (filter !== this.newFilters[this.newFilters.length - 1]) {
              filterAsString += operator;
            }
          }

          this.savedFilters[this.currentCount - 1].rule = filterAsString;
          this.savedFilters[this.currentCount - 1].filter = this.newFilters;
          console.log("savedfilter filter", this.savedFilters.filter);
          filterAsString = '';
          this.newFilters = [];

        }
      });
    } else {
      this.savedFilters.splice(this.currentCount - 1, 1);
      console.log("updated savedfilter", this.savedFilters);
      if (this.savedFilters.length !== 0) {
        for (let i = 0; i < this.savedFilters.length; i++) {
          this.savedFilters[i].count -= 1;
        }

      }
      this.count -= 1;

    }

    this.updateList = false;
    this.displayStyle = "none";




  }

}


