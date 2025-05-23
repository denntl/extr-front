import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { MatchRule } from 'src/services/validation/rules/MatchRule'
import { NumberRule } from 'src/services/validation/rules/NumberRule'

export const getValidationRules = () => {
  return {
    name: [new RequiredRule(), new StringRule(5, 255)],
    domain_type: [new RequiredRule()],
    domain: [new RequiredRule()],
    subdomain: [
      new RequiredRule(),
      new StringRule(1, 255),
      new MatchRule(
        /^[\w\d-]+$/i,
        'Некорректный субдомен. Допустимо использовать только латинские буквы и символ "-", при этом запрещено использование точки, запятой и символов кириллицы.',
      ),
    ],

    pixel_id: [new RequiredRule(), new StringRule(5, 255)],
    pixel_key: [new RequiredRule(), new StringRule(5, 255)],
    link: [
      new RequiredRule(),
      new StringRule(20, 255),
      new MatchRule(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=\{\}]{1,256}((\.[a-zA-Z0-9()]{1,6})|(:[0-9]{1,6}))\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=\{\}]*)$/i,
        'Невалидная ссылка',
      ),
      new MatchRule(/\?(.*&)?[a-zA-Z0-9_]+=\{external_id\}/i, 'Добавьте макрос  {external_id}'),
    ],

    platform_type: [new RequiredRule()],
    icon: [new StringRule(5, 255)],
    app_name: [new StringRule(5, 255)],
    developer_name: [new StringRule(5, 255)],
    downloads_count: [new StringRule(0, 20)],
    rating: [new NumberRule(0, 5, true)],
  }
}
