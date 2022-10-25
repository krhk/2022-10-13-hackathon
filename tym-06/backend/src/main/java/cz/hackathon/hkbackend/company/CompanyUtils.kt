package cz.hackathon.hkbackend.company



class Utils {
    companion object {
        // kotlin is <3
        fun parseToUsefullData(data: RootXmlNode): List<Employee> {
            return data.field.filed.filed.listOfEmployees.objects.map { it.field.toUse() }
        }
    }
}