class CharacterBody {
    constructor(gender, age, ethnicity){
        this.age = age
        this.ageGroup = ageGroupFromAge(age, gender)
        this.traits = {}
        let ageGroupTrait = ageGroupTraitFromAge(age)
        this.traits[ageGroupTrait.name] = ageGroupTrait
        let genderTrait = genderTraitFromGender(gender)
        this.traits[genderTrait.name] = genderTrait

        this._setEthnicity(ethnicity)
        this.setFaceBeauty("average")
        this.setTallness("average")
        if (gender == "female"){
            this.setBreastSize("modest")
        } else if (gender == "male"){
            this.setPenisSize("moest")
        }
    }
    _setEthnicity(ethnicity){
        let ethnicityTrait = buildEthnicityTrait(ethnicity)
        this.ethnicity = ethnicityTrait.name
        this.traits[ethnicityTrait.name] = ethnicityTrait
    }
    setFaceBeauty(faceBeautyRating){
        let faceBeautyTrait = buildFaceBeautyTrait(faceBeautyRating)
        this.traits[faceBeautyTrait.name] = faceBeautyTrait
        this.faceBeauty = faceBeautyTrait.value
    }
    setTallness(tallnessRating){
        let talnessTrait = buildTallnessTrait(tallnessRating)
        this.traits[talnessTrait.name] = talnessTrait
        this.tallness = talnessTrait.value
    }
    setBreastSize(size){
        if (size !== undefined){
            let breastSizeTrait = buildBreastSizeTrait(size)
            this.traits[breastSizeTrait.name] = breastSizeTrait
            this.breastSize = breastSizeTrait.value
        } else {
            let index = this.traits.indexOf("breast size")
            if (index <= -1){
                this.traits.splice(index, 1)
            }
            this.breastSize = undefined
        }
    }
    setPenisSize(size){
        if (size !== undefined){
            let penisSizeTrait = buildPenisSizeTrait(size)
            this.traits[penisSizeTrait.name] = penisSizeTrait
            this.penisSize = penisSizeTrait.value
        } else {
            let index = this.traits.indexOf("penis size")
            if (index <= -1){
                this.traits.splice(index, 1)
            }
            this.penisSize = undefined
        }
    }
}

class GroomingAndStyle {
    constructor(hairColor, hairLength, isHairStyled, isMuscled, isWellDressed, personalCareLevel){
        if (hairColor !== undefined){
            this.setHairColor(hairColor)
        } else {
            this.setHairColor("brown")
        }
        if (hairLength !== undefined){
            this.setHairLength(hairLength)
        } else {
            this.setHairLength("short")
        }
        if (isHairStyled !== undefined){
            this.setIsHairStyled(isHairStyled)
        } else {
            this.setHair(false)
        }
        if (isMuscled !== undefined){
            this.setisMuscled(isMuscled)
        } else {
            this.setisMuscled(false)
        }
        if (isWellDressed !== undefined){
            this.setIsWellDressed(isWellDressed)
        } else {
            this.setIsWellDressed(false)
        }
        if (personalCareLevel !== undefined){
            this.setPersonalCare(personalCareLevel)
        } else {
            this.setPersonalCare("acceptable")
        }
    }
    setHairColor(hairColor){
        let hairColorTrait = buildHairColorTrait(hairColor)
        this.traits[hairColorTrait.name] = hairColorTrait
        this.hairColor = hairColorTrait.value
    }
    setHairLength(hairLength){
        let hairLengthTrait = buildHairLengthTrait(hairLength)
        this.traits[hairLengthTrait.name] = hairLengthTrait
        this.hairLength = hairLengthTrait.value
    }
    setIsHairStyled(isHairStyled){
        if (isHairStyled == true){
            let styledHairTrait = buildStyledHairTrait()
            this.traits[styledHairTrait.name] = styledHairTrait
        } else {
            let index = this.traits.indexOf("styled hair")
            if (index > -1){
                this.traits.splice(index, 1)
            }
        }
        this.isHairStyled = isHairStyled
    }
    setIsMuscled(isMuscled){
        if (isMuscled == true){
            let muscledTrait = buildMuscledTrait()
            this.traits[muscledTrait.name] = muscledTrait
        } else {
            index = this.traits.indexOf("muscled")
            if (index > -1){
                this.splice(index, 1)
            }
        }
        this.isMuscled = isMuscled
    }
    setIsWellDressed(isWellDressed){
        if (isWellDressed == true){
            let wellDressedTrait = buildWellDressedTrait()
            this.traits[wellDressedTrait.name] = wellDressedTrait
        } else {
            index = this.traits.indexOf("well dressed")
            if (index > -1){
                this.splice(index, 1)
            }
        }
        this.isWellDressed = isWellDressed
    }
    setPersonalCare(personalCareLevel){
        let personalCareTrait = buildpersonalCareTrait(personalCareLevel)
        this.traits[personalCareTrait.name] = personalCareTrait
        this.personalCareLevel = personalCareTrait.value
    }
}
