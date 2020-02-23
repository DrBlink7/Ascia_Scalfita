package dal.dtos;

public class MonsterDmg {
    public boolean combatEnd;
    public int damage;
    public MonsterDmg(boolean combatEnd, int rand) {
        this.combatEnd = combatEnd;
        this.damage = rand;
    }
}
