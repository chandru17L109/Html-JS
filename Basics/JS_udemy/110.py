class Blood:
    def __init__(self,bloodGroup,unitInHand):
        self.bloodGroup=bloodGroup
        self.unitInHand=unitInHand
class BloodBank(Blood):
    def __init__(self,bloodG4roup,unitInHand,bloodList):
        super().__init__(bloodGroup,unitInHand)
        self.bloodList=bloodList

    def isBloodAvailable(self,bloodGroup,unitInHand):
        for i in range(len(self.bloodList)):
            if self.bloodList[i][0] == self.bloodGroup:
                if self.bloodList[i][1] >= self.unitInHand:
                    return "Blood Available"
        return "Blood not Available"
    def finMinBloodStock(self):
        find_min=[]
        for i in range(len(self.bloodList)):
            find_min.append(self.bloodList[i][1])
        minimum_blood = min(find_min)
        for i in range(len(self.bloodList)):
            if self.bloodList[i][1] == minimum_blood:
                print(self.bloodList[i][0])

Number_of_bloodobjects = int(input())
list_of_blood=[]
for i in range(Number_of_bloodobjects):
    blood = input().upper()
    unit  = int(input())
    list_of_blood.append([blood,unit])
bloodGroup = input().upper()
unitInHand = int(input())
obj1 = BloodBank(bloodGroup,unitInHand,list_of_blood)
print(obj1.isBloodAvailable(bloodGroup,unitInHand))
obj1.finMinBloodStock()


