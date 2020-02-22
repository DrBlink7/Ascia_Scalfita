package dal;

import dal.dtos.FetchData;
import dal.dtos.userDetailDTO;
import java.util.ArrayList;
import java.util.List;

public class UserService {
    private userDetailDTO userDetail;

    public FetchData getUserData(String username, String location) {

        userDetail = new userDetailDTO(username);

        return new FetchData(location,userDetail);
    }

    public Integer getMonsterDmg(String username, String location, String monsterName) {

        return (int)(Math.random()*100);
    }
}
