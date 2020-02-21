package dal.dtos;

import java.util.ArrayList;
import java.util.List;

public class FetchData {
    private String location;
    private userDetailDTO userData;
    public FetchData(String loc, userDetailDTO user) {
        this.location = loc;
        this.userData = user;
    }
}
