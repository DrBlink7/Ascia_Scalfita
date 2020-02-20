package dal.dtos;

import java.util.ArrayList;
import java.util.List;

public class FetchData {
    private String location;
    private List<TestDto> userData;
    public FetchData(String location, ArrayList<TestDto> arr) {
        this.location = location;
        this.userData = arr;
    }
}
