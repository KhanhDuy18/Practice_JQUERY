@Plugin({
  props: {
    options: {
      citySelect: '[data-city-select]',
      districtSelect: '[data-district-select]',
      communeSelect: '[data-commune-select]',
      provinceData: {}
    },
  }
})
export default class SelectProvince {
  init() {
    this.initDOM();
    this.handleSelect();
    this.appendOption();
    this.removeAllOption();
  }

  initDOM() {
    const { citySelect, districtSelect, communeSelect } = this.props.options;
    this.$selectContainer = $(this.$element);
    this.$citySelect = this.$selectContainer.find(citySelect);
    this.$districtSelect = this.$selectContainer.find(districtSelect);
    this.$communeSelect = this.$selectContainer.find(communeSelect);
  }

  async getData() {
    let { provinceData } = this.props.options;
    provinceData = await $.getJSON('https://raw.githubusercontent.com/qtv100291/Vietnam-administrative-division-json-server/master/db.json');
    return provinceData;
  }

  async handleSelect() {
    const { citySelect, districtSelect, communeSelect } = this.props.options;
    const data = await this.getData();

    data.province.forEach((item) => {
      this.appendOption(citySelect, item.idProvince, item.name);
    });

    this.$citySelect.on('change', () => {
      this.removeAllOption(districtSelect);
      this.removeAllOption(communeSelect);

      const dataDistrict = data.district.filter(item => item.idProvince === this.$citySelect.val());
      const dataCommune = dataDistrict.map((item) => {
        console.log('1');
        return data.commune.filter(commune => commune.idDistrict === item.idDistrict);
      });

      dataDistrict.forEach((item) => {
        this.appendOption(districtSelect, item.idDistrict, item.name);
      });
      dataCommune.forEach((array) => {
        array.forEach((item) => this.appendOption(communeSelect, item.idCommune, item.name));
      });
    });

    this.$districtSelect.on('change', () => {
      this.removeAllOption(communeSelect);
      data.commune.forEach((item) => {
        if (item.idDistrict === this.$districtSelect.val()) {
          this.appendOption(communeSelect, item.idCommune, item.name);
        }
      });
    });
  }

  appendOption(element, idOption, nameOption) {
    this.$selectContainer.find(element).append($('<option>', {
      value: idOption,
      text: nameOption
    }));
  }

  removeAllOption(element) {
    this.$selectContainer.find(element).find('option').remove().end();
  }
}
