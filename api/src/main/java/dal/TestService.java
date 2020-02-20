package dal;

import dal.dtos.FetchData;
import dal.dtos.TestDto;
import java.util.ArrayList;
import java.util.List;

public class TestService {
    private List<TestDto> arr;

    public FetchData prova(String name, String cognome, String location) {

        var arr = new ArrayList<TestDto>();

        arr.add(new TestDto());
        arr.add(new TestDto(name,cognome));

        return new FetchData(location,arr);
    }
}
