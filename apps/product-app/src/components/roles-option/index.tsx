import { Company } from '@product-checkout-assigment/product-lib'
import { usecompanyState } from '../../stores/company'
import './styles.css'

export const RoleOption = () => {
    const companyState = usecompanyState()
    return (
        <div className="form-group">
            <strong><label className="titleSidebar" htmlFor="exampleFormControlSelect1">Customer</label></strong>
            <select className="form-control mt-2" id="exampleFormControlSelect1" onChange={(e) => companyState.setCompany(e.target.value as Company)}>
                <option value={null} >Default</option>
                <option value={Company.AMAZON}>Amazon</option>
                <option value={Company.MICROSOFT}>Microsoft</option>
                <option value={Company.FACEBOOK}>Facebook</option>
            </select>
        </div>
    )
}