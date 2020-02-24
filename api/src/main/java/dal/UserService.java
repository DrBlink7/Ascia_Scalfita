package dal;

import dal.dtos.FetchData;
import dal.dtos.MonsterDmg;
import dal.dtos.userDetailDTO;

public class UserService {
    private userDetailDTO userDetail;

    public FetchData getUserData(String username, String location) {

        userDetail = new userDetailDTO(username);

        return new FetchData(location,userDetail);
    }

    public MonsterDmg getMonsterDmg(String username, String location, String monsterName) {
        var rand = (int)(Math.random()*100);
        var combatEnd = rand % 2 == 0 ? true : false;
        var result = new MonsterDmg(combatEnd,rand);
        return result;
    }
}
