import React from 'react';
import BaseDialog from "../base_dialog";

const EditTableDialog = (props) => {
    return (
        <BaseDialog visible={props.visible} setVisible={props.setVisible}>
            <table>
                <tr>
                    <td>

                    </td>
                </tr>
            </table>
        </BaseDialog>
    );
};

export default EditTableDialog;