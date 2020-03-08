package dal;

import dal.dtos.FetchData;
import dal.dtos.MonsterDmg;
import dal.dtos.userDetailDTO;
import org.jetbrains.annotations.NotNull;

public class UserService {
    private userDetailDTO userDetail;

    public FetchData getUserData(String username, String location) {

        userDetail = new userDetailDTO(username);

        return new FetchData(location,userDetail);
    }

    public MonsterDmg getMonsterDmg(String username, String location, String monsterName) {
        // prendi danno dal db
        var rand = (int)(Math.random()*100);
        var combatEnd = rand % 2 == 0 ? true : false;
        var result = new MonsterDmg(combatEnd,rand);
        return result;
    }

    public boolean setUserDmg(String username, Integer dmg,String location, String monsterName) {
        if(dmg >=0){
           // getMonsterDmg(username,location,monsterName,dmg);
            tests(username,location,monsterName,dmg);
            return true;
        }
        else
            return false;
    }

    public MonsterDmg tests(String username, String location, String monsterName, Integer dmg){
        System.out.println(monsterName+" subisce "+dmg+" danno da "+username+".");
        //setta danno sul db
        return null;
    }

    public boolean fightOn(String username, @NotNull String location) {
        System.out.println("user: "+username+" entra in "+location);
        if(location.compareToIgnoreCase("Le_Grandi_Scogliere") == 0){
            // query se è già entrato non deve rifarlo
            var rand = (int)(Math.random()*100);
            var combatEnd = rand % 2 == 0 ? true : false;
            return combatEnd;
        }
        return false;
    }
}
