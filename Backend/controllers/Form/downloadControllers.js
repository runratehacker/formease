
import downloadAdmissionController from './downloadAdmissionController.js'
import downloadAccountOpeningController from './downloadAccountOpeningController.js'
import downloadMedicalIntakscontroller from './downloadMedicalIntakscontroller.js'


// Array of controller functions

const downloadControllers = [{
    id: 1,
    controller: downloadAdmissionController
}, {
    id: 2,
    controller: downloadAccountOpeningController
}, {
    id: 3,
    controller: downloadMedicalIntakscontroller
}]

export { downloadControllers }