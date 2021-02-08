var $tableRows
var $createBtn
var $updateBtn
var $titleFld
var $sectionFld
var $seatsFld
var $semesterFld

var courseService = new CourseServiceClient()


// var courses = [
//     {title: "CS4550", section: "02", seats: 23, semester: "Spring"},
//     {title: "CS2345", section: "03", seats: 34, semester: "Spring"},
//     {title: "CS3456", section: "04", seats: 45, semester: "Spring"},
//     {title: "CS5610", section: "05", seats: 56, semester: "Spring"},
//     {title: "CS5200", section: "06", seats: 67, semester: "Spring"},
// ]


// this one is for the alternative that in renderCourse I choose to use index{i} instead of object id{course._id}
// function deleteCourse(event) {
//     var button = $(event.target)
//     var index = button.attr("id")
//     var id = courses[index]._id
//     courseService.deleteCourse(id)
//         .then(function (status) {       // I am receiving the status, but I don't really need to use it
//             courses.splice(index, 1)    // update userface, making sure it is synchronized
//             renderCourses(courses)
//         })
// }


// this one is for the alternative that in renderCourse I choose to use object id{course._id} instead of index{i}
// it is important to understand the local array/dict and the one stored in server is different
// I need to keep an array/dict locally for rendering purposes. users.splice(index, 1), I need to get index and
// delete that row locally so that visually it shows it is gone
// In back end (server), I need to get the object real id and delete by the object real id. The backend will remove
// it by just calling the delete api
function deleteCourse(event) {
    var id = $(event.target).attr("id")
    courseService.deleteCourse(id)
        .then(function (status) {
            // I am receiving the status, but I don't really need to use it
            // line 38-39 is to update userface, making sure it is synchronized
            var index = courses.findIndex(course => course._id === id)
            courses.splice(index, 1)
            renderCourses(courses)
        })
}


function createCourse() {
    var newCourse = {
        title: $titleFld.val(),
        section: $sectionFld.val(),
        seats: $seatsFld.val(),
        semester: $semesterFld.val()
    }
    courseService.createCourse(newCourse)
        .then(function (actualCourse) {
            courses.push(actualCourse)      // why push(actualCourse)? what happens if I push 'newCourse'?
            renderCourses(courses)
        })
}



// professor put the variable outside of the function to make it global because updateCourse function also works
// directly with selectedCourse variable and depends on the selectCourse function
var selectedCourse = null
function selectCourse(event) {
    var id = $(event.target).attr("id")
    // console.log(id)
    selectedCourse = courses.find(course => course._id === id)
    $titleFld.val(selectedCourse.title)
    $sectionFld.val(selectedCourse.section)
    $seatsFld.val(selectedCourse.seats)
    $semesterFld.val(selectedCourse.semester)
}


// the update function works by selecting a row and then hit update button
function updateCourse() {
    selectedCourse.title = $titleFld.val()
    selectedCourse.section = $sectionFld.val()
    selectedCourse.seats = $seatsFld.val()
    selectedCourse.semester = $semesterFld.val()
    courseService.updateCourse(selectedCourse._id, selectedCourse)
        .then(status =>  {
            // I am receiving the status, but I don't really need to use it. The below is to synchronize interface
            // The selected course is just the course, it does not tell me where/which position it belongs to the
            // course array. Therefore I need to find by object _id and then make the update.
            // Note **, in the selectCourse function, the selectedCourse had the original row course info, but in
            // this function line 64-67, we already updated it by making the title/section..equals to what is newly typed
            var index = courses.findIndex(course => course._id === selectedCourse._id)
            courses[index] = selectedCourse
            renderCourses(courses)
        })
}


function renderCourses(courses) {
    $tableRows.empty()
    for (var i = 0; i < courses.length; i++) {
        var course = courses[i]
        $tableRows.prepend(`
      <tr>
          <td>${course.title}</td>
          <td>${course.section}</td>
          <td>${course.seats}</td>
          <td>${course.semester}</td>
          <td>
<!--              <button id="${i}" class="neu-delete-btn">Delete</button>-->
              <button id="${course._id}" class="neu-delete-btn">Delete</button>
              <button id="${course._id}" class="wbdv-select-btn">Select</button>
          </td>
      </tr>
      `)
    }
    $(".neu-delete-btn").click(deleteCourse)
    $(".wbdv-select-btn").click(selectCourse)
}



function main() {
    $tableRows = jQuery(".wbdv-table-rows")
    $createBtn = $(".wbdv-create-btn")
    $titleFld = $(".wbdv-title-fld")
    $sectionFld = $(".wbdv-section-fld")
    $seatsFld = $(".wbdv-seats-fld")
    $semesterFld = $(".wbdv-semester-fld")
    $updateBtn = $(".wbdv-update-btn")

    $createBtn.click(createCourse)
    $updateBtn.click(updateCourse)
    courseService.findAllCourses().then(function (actualCourses) {
        courses = actualCourses
        renderCourses(courses)
    })

}

$(main)